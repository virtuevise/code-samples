import { Visit } from 'src/app/model/trip-details.model';
import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MemberService } from 'src/app/services/member.service';
import { MatCheckboxChange } from '@angular/material/checkbox/checkbox';
import {AccountService} from '../../services/account.service'

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.scss']
})

export class TripDetailsComponent implements OnInit {
  areas: any = [];
  allInterest: any = [];
  cities: any = [];
  excludedCities: any = [];
  visitPurpose: any = [];
  isDisabled: boolean = true;
  public model: Visit = new Visit();

  myplaceHolder: string = 'Select';
  status: boolean;
  isChecked: boolean = false;
  todayDate: Date = new Date();
  constructor(private memberService: MemberService, private router: Router, private route: ActivatedRoute,private AccountService:AccountService) { }

  checkPlaceHolder(val) {
    debugger
    if (this.myplaceHolder) {
      this.myplaceHolder = null
      return;
    } else {
      this.myplaceHolder = 'Select'
      return
    }
  }

  goToAccounts() {
    this.router.navigateByUrl(`/accountDetails/true`);
  }

  async ngOnInit() {
    try {
      const memberId = this.AccountService.JwtDecoder(localStorage.getItem("Token"));
      this.model.MemberId = memberId;
      await this.memberService.getVisitDetails().subscribe((data: any) => {
        debugger
        const { responseData } = data.result;
        const { areas } = responseData;
        const { cities } = responseData;
        const { interest } = responseData;
        const { purpose } = responseData;
        this.areas = areas;
        this.cities = cities;
        this.allInterest = interest;
        this.visitPurpose = purpose;
     
       this.memberService.getMemberVisitInfo(memberId).then((data) => {
        if (data) {
          this.model.EndDate = data.EndDate;
          this.model.InterestId = data.InterestId;
          this.model.PurposeId = data.PurposeId;
          this.model.AreaId = data.AreaId;
          this.model.CityId = data.CityId;
          this.isChecked = data.SpecialOffers;
          this.OnAreaChange(data.AreaId);

          this.isDisabled = false;
        }
      });
    });
    } catch (error) {
      console.error(error);
    }
    try {
      debugger
      const status = this.route.snapshot.paramMap.get('status');
      this.status = JSON.parse(status);
    } catch (error) {
      console.error(error);
    }
  }

  OnAreaChange(areaId) {
    debugger
    if (areaId) {
      this.excludedCities = [];
    areaId.forEach(x => {
      const areaCities  = this.cities.filter((t)=>{
        if(t.areaId == x){ return t;}
      })
      this.excludedCities.push(...areaCities)
    });
    }else{
      this.excludedCities = [];
      this.excludedCities.push(this.cities);
    }
    
    this.OnChangeTripDetails();
  }

  OnChangeTripDetails() {
    debugger
    let data = this.model;
    if (data.AreaId != undefined && data.AreaId.length > 0
      && data.InterestId != undefined && data.InterestId.length > 0
      && data.CityId != undefined && data.CityId.length > 0
      && data.PurposeId != undefined && data.PurposeId.toString().length > 0
      && data.EndDate
    ) {
      this.isDisabled = false;
    }
    else {
      this.isDisabled = true;
    }
  }

  checked(event:MatCheckboxChange) {
    this.isChecked = event.checked;
  }

  async continue() {
    debugger
    let data = this.model;
    if (data.EndDate == undefined) {
      return alert("Please tell us upto which day you will be here?");
    }
    if (data.PurposeId == undefined) {
      return alert("Please tell us your purpose?");
    }
    if (data.AreaId == undefined) {
      return alert("Please tell us in which area you will stay?");
    }
    if (data.CityId == undefined) {
      return alert("Please tell us in which city you will stay?");
    }
    if (data.InterestId == undefined) {
      return alert("Please tell us what is thing which you'll most likely to buy?");
    }   
    if (this.isChecked == true) {
      this.model.SpecialOffers = true
    }else{
      this.model.SpecialOffers = false  
    }
      await this.memberService.updateVisitDetails(this.model).then((data) => {
        this.router.navigateByUrl(`/EazyPassComplete/${this.status}/no`);
     });
  }

  async updateTripDetails() {
    //goToService
  debugger
  if (this.isChecked == true) {
    this.model.SpecialOffers = true
  }else{
    this.model.SpecialOffers = false  
  }
    await this.memberService.updateVisitDetails(this.model).then((data) => {
      this.router.navigateByUrl("/linksOptions");
     // if (data) {
     //   this.router.navigateByUrl("/linksOptions");
    //  }
    });
  }
}
