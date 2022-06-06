import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActionSheetController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

interface Location {
  latitude: string;
  longitude: string;
}

@Component({
  selector: 'app-shop-details-message',
  templateUrl: './shop-details-message.component.html',
  styleUrls: ['./shop-details-message.component.scss']
})
export class ShopDetailsMessageComponent implements OnInit {
  StoreName: string
  StoreAddres: string
  StorePhone: string
  StoreCity: string
  Country: string;
  Url:string;

  constructor(public modalPopup: MatDialogRef<ShopDetailsMessageComponent>, @Inject(MAT_DIALOG_DATA) public data: { name: string, address: string, city: string, Country: string, Phone: string,Url:string }, public actionSheetController: ActionSheetController, private http: HttpClient) { }

  ngOnInit(): void {
    console.log(this.data.Url);
    this.StoreName = this.data.name;
    this.StoreAddres = this.data.address;
    this.StorePhone = this.data.Phone;
    this.StoreCity = this.data.city;
    this.Country = this.data.Country;
    this.Url = this.data.Url;
  }

  openPopUpDetailsShop() {
    /*  this.NavigationComponent.openPopUpDetailsShop().subscribe(data =>{
       alert(data);
     }); */
  }

  goToSummary() {
    this.modalPopup.close();
  }

  async openAppNavigation() {

    this.getLatAndLong().subscribe(data => {
      console.info(data);
    })
    /*    let toLat=data.latitude;
       let toLong=data.longitude; */
    let toLat = "3.1467845";
    let toLong = "101.6897892";
    let destination = toLat + ',' + toLong;
    let actionLinks = [];

    const actionSheet = await this.actionSheetController.create({
      header: 'Albums',
      cssClass: 'appNavigation',
      buttons: [{
        text: 'Google Maps App',
        /*  icon: 'navigate', */
        handler: () => {
          window.open("https://www.google.com/maps/search/?api=1&query=" + destination)
        }
      }, {
        text: 'Waze App',
        /* icon: 'navigate', */
        handler: () => {
          window.open("https://waze.com/ul?ll=" + destination + "&navigate=yes&z=10");
        }
      }]
    });
    await actionSheet.present();

    /*  actionLinks.push({
       text: 'Google Maps App',
       icon: 'navigate',
       handler: () => {
         window.open("https://www.google.com/maps/search/?api=1&query="+destination)
       }
     })
     actionLinks.push({
       text: 'Waze App',
       icon: 'navigate',
       handler: () => {
         window.open("https://waze.com/ul?ll="+destination+"&navigate=yes&z=10");
       }
     });
 
    //2C. Add a cancel button, you know, just to close down the action sheet controller if the user can't make up his/her mind
     actionLinks.push({
       text: 'Cancel',
       icon: 'close',
       role: 'cancel',
       handler: () => {
       }
     })
 
 
     const actionSheet = await this.actionSheetController.create({
       header: 'Navigate',
       buttons: actionLinks
     });
     
     await actionSheet.present(); */
  }

  getLatAndLong() {
    return this.http.get<Location>('https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyAC2PPCP-9rKNlUVSqlOlmY2OMR8iHVRlY');
  }

  showOnMap() {
    this.modalPopup.close({
      action: "ShowOnMap",
      name: this.StoreName,
      addres: this.StoreAddres,
      city: this.StoreCity,
      country: this.Country
    });
    var otherWindow= window.open(this.Url, '_blank');
    otherWindow.opener = null;
  }
}
