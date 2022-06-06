import { Component, ElementRef, NgZone, OnInit } from '@angular/core';
import { Shop } from 'src/app/model/shop.model';
import { MemberService } from 'src/app/services/member.service';
import { MatDialog } from '@angular/material/dialog';
import { MapsAPILoader } from '@agm/core';
import { ShopDetailsMessageComponent } from '../shop-details-message/shop-details-message.component'
import { StoreMessageComponent } from '../store-message/store-message.component';
import { Observable } from 'rxjs';




@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  shopsVatData:Shop[];
  selectedShop:Shop;
  latitude = 32.0853;
  longitude = 34.7818;
  private geoCoder;
  zoom: number;
  isNoDelivery: boolean;
  
  country: any;
  cityVM = {
    city: null,
    address: null,
    email: null,
    lat: null,
    long: null,
    name: null
  };
  selectedCityAddress: string = null;
  public searchElementRef: ElementRef;
  

  constructor(private mapsAPILoader: MapsAPILoader,private memberService: MemberService,public dialog: MatDialog,private ngZone: NgZone,) { }

  async ngOnInit() {
    try {
      ;
      await this.memberService.getShopsVatDetails().subscribe((data: any) => {
        ;
      this.shopsVatData= data.result.responseData;
      });
 

    } catch (error) {
      console.info(error);
    }
    this.loadMap();
  }


  loadMap() {
    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      this.geoCoder = new google.maps.Geocoder;

      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        componentRestrictions: {
          country: ["US"],
        },
        strictBounds: true
        // types: ['(establishment)']
      });

      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            this.cityVM = {
              city: null,
              address: null,
              email: null,
              lat: null,
              long: null,
              name: null
            };
            this.selectedCityAddress = null;
            sessionStorage.removeItem('selectedCityAddress');
            sessionStorage.removeItem('userLatitude');
            sessionStorage.removeItem('userLongtitude');

            return;
          }

          // console.log(place);
          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;


          const components = place.address_components;
          let city;
          let state;

          if (components != undefined) {
            for (var i = 0; i < components.length; i++) {
              if (components[i].types[0] == "locality") {
                city = components[i];
              }
              if (components[i].types[0] == "administrative_area_level_1") {
                state = components[i];
              }
              if (components[i].types[0] == "country") {
                this.country = components[i];
              }
            }
          }

          console.log(this.country.short_name);
            if (this.country.short_name === "US") {
              this.isNoDelivery = true;
            }
            else {
              this.isNoDelivery = false;
            }

          this.cityVM.city = city;
          this.cityVM.lat = place.geometry.location.lat().toString();
          this.cityVM.long = place.geometry.location.lng().toString();
          this.cityVM.address = place.formatted_address;
          this.selectedCityAddress = this.cityVM.address;

          sessionStorage.setItem('selectedCityAddress', this.selectedCityAddress);
          sessionStorage.setItem('userLatitude', this.cityVM.lat);
          sessionStorage.setItem('userLongtitude', this.cityVM.long);
          sessionStorage.setItem('selectedCity', this.cityVM.city);

        });
      });
    });
  }

  OnBuisnessShow(event)
  {
    ;
    this.selectedShop=new Shop();
    this.selectedShop.Address= event.value.address;
    this.selectedShop.City=event.value.city;
    this.selectedShop.Country=event.value.country;
    this.selectedShop.Phone=event.value.phone;
    this.selectedShop.Name=event.value.name;
    this. openPopUpDetailsShop();
    
  }


  openPopUpDetailsShop() {
    ;
    const dialogRef = this.dialog.open(ShopDetailsMessageComponent, {
      width: '450px',
      data: {name: this.selectedShop.Name,
             address: this.selectedShop.Address,
             city: this.selectedShop.City,
             Country: this.selectedShop.Country,
             Phone:this.selectedShop.Phone
            }
    });
    dialogRef.afterClosed().subscribe(result => {
      alert(result.addres);
    });
  }

   mapClick(){
    
    }
   
}
