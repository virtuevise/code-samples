import { AccountService } from "src/app/services/account.service";
import { Component, OnInit } from "@angular/core";
import { AccountProfile } from "src/app/model/account-profile.model";
import { Router, ActivatedRoute } from '@angular/router';

import { LanguageHelperService } from "src/app/core/services/language-helper.service";
import { ILanguageItem } from "src/app/core/model/language.model";
import { NgForm } from "@angular/forms";
import { from } from "rxjs";

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss']
})
export class AccountDetailsComponent implements OnInit {
  status: boolean;
  nextPage: string;
  stripper:boolean;
  manage:boolean=false;
  country = [];
  public model: AccountProfile = new AccountProfile();
  public viewMode: boolean;
  constructor(
    private router: Router,
    private accountService: AccountService,
    public languageHelperService: LanguageHelperService,
    private route: ActivatedRoute) { }

  async ngOnInit() {
    try {      
      debugger
      this.accountService.getCountryForForm().subscribe((res:any)=>{
        this.country = res.responseData;
      })

      const status = this.route.snapshot.paramMap.get('status');
      const flagUpdate = this.route.snapshot.paramMap.get('flag');
      if (status == 'true') {
        this.stripper = true;        
      }else{
        this.stripper = false;
      }
      if((status=='true' && flagUpdate=='no')||(status=='false' && flagUpdate=='no'))
      {
        this.manage=true;
      }
      this.status = JSON.parse(status);
      if (this.status == true) {
        this.viewMode = true
      }else{
        this.viewMode = false;
      }

      if (this.viewMode) {
        debugger
        this.model.FirstName = this.accountService.passportData.givenNames;
        this.model.LastName = this.accountService.passportData.surname;
        this.model.Nationality = this.accountService.passportData.nationalityCountryCode;
        this.model.PassportNumber = this.accountService.passportData.documentNumber;
        this.model.BirthDate = this.reverseString(this.accountService.passportData.formattedDateOfBirth);
        this.model.ExpiredOn = this.reverseString(this.accountService.passportData.formattedDateOfExpiry);
        this.model.IssueDate = this.reverseString(this.accountService.passportData.formattedVizDateOfIssue);
        console.log("data" ,this.model);
      }


    } catch (error) {
      console.info(error);
    }
    try {
      debugger;
      const status = this.route.snapshot.paramMap.get('status');
      const flagUpdate = this.route.snapshot.paramMap.get('flag');
      this.status = JSON.parse(status);
      if (flagUpdate == "no")  //manage status
        this.nextPage = 'EazyPassComplete/true/yes';
      else
        this.nextPage = 'memberConnectionDetails/false';
    
    } catch (error) {
      console.info(error);
    }
  }

   reverseString(str) {
    var splitString = str.split(".");  
    var reverseArray = splitString.reverse();
    var joinArray = reverseArray.join("-"); 
    return joinArray; 
    }

  async onClickSaveAccountDetails(AccountForm:NgForm){
    try {
    if (this.viewMode == true) {
        await this.accountService.scanPassport(this.model).then((res:any)=>{
       localStorage.setItem("Token",res.Token);
       this.accountService.saveUserDetails(this.model).subscribe((res:any)=>{ });
     });  
    }else{
     await this.accountService.scanPassport(AccountForm).then((res:any)=>{
       localStorage.setItem("Token",res.Token);
       this.accountService.saveUserDetails(AccountForm).subscribe((res:any)=>{ });
     });    
  }
    } catch (error) {
      console.log(error);
    }finally{
    this.router.navigateByUrl(`/${this.nextPage}`);
    } 
  }

  goToScanPass() {
    this.router.navigateByUrl(`/scanPassport/true`);
  }

  
  /*  public setLanguage(lang: ILanguageItem) {
     this.languageHelperService.setLanguage(lang);
   } */

}
