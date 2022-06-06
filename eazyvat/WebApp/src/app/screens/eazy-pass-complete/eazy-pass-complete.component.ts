import { Component, Input, OnInit } from '@angular/core';
import { PassportDetails } from 'src/app/model/passport-details.model';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService } from "src/app/services/account.service";
import { AccountProfile } from "src/app/model/account-profile.model";
import { PurchaseService } from 'src/app/services/purchase.service';



@Component({
  selector: 'app-eazy-pass-complete',
  templateUrl: './eazy-pass-complete.component.html',
  styleUrls: ['./eazy-pass-complete.component.scss']
})
export class EazyPassCompleteComponent implements OnInit {
  statusWelcome: boolean;
  status: boolean;
  statusUpdate: boolean;
  statusCompleteUpdate: boolean;
  
  memberName = 'Nitzan';
  nextPage: string;
  public model: AccountProfile = new AccountProfile();



  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private AccountService: AccountService,
    private PurchaseService:PurchaseService

  ) { }
  async ngOnInit() {
    debugger;
    try {  
      localStorage.setItem("token",localStorage.getItem("Token"));
      let memId = this.AccountService.JwtDecoder(localStorage.getItem("Token"));
      await this.AccountService.getAccountProfile(memId).subscribe((data: any) => {
        debugger
        if (data.statusCode == 200) {
          const { result } = data.responseData;
          this.model.FirstName = result.firstName;
          this.model.LastName = result.lastName;
          this.model.Nationality = result.nationality;
          this.model.PassportNumber = result.passportNumber
          this.AccountService.passportId = result.id;
          this.model.BirthDate = result.birthDate;
          this.model.IssueDate = result.issueDate;
          this.model.ExpiredOn = result.expiredOn;      
        }    
        const passportId = this.AccountService.passportId;
        this.PurchaseService.getPurchaseNewCount(passportId).subscribe((data:any)=>{
         this.PurchaseService.purchaseCount.next(data.responseData);
       });   
      });
     
    } catch (error) {
      console.info(error);
    }
   localStorage.setItem("token",localStorage.getItem("Token"));
    try {
      debugger;
      const status = this.route.snapshot.paramMap.get('status');
      const flagUpdate = this.route.snapshot.paramMap.get('flag');
      this.status = JSON.parse(status);
      if (this.status == true)  //manage status
      {
        
          //אם הגעת מדף הלינקים תעבור לסריקה אחרת תעבור ללינקים
          if(flagUpdate=='no')
          {
            this.statusCompleteUpdate=false; 
            this.statusUpdate=true;  
            this.statusWelcome=false;
            this.nextPage = 'scanPassport/true/no';
          }
          else
          if(flagUpdate=='yes')
          {
           
            this.statusCompleteUpdate=true; 
            this.statusUpdate=false;  
            this.statusWelcome=false;
            this.nextPage = 'linksOptions';
          }
      }
      else  //welcome status
       if (this.status == false)
      {
    

        this.statusWelcome=true;
        this.statusUpdate=false; 
        this.statusCompleteUpdate=false; 
        this.nextPage = 'purchasesSummary' ;
      }

    } catch (error) {
      console.info(error);
    }
  }
  goToScanPass() {

    this.router.navigateByUrl("/scanPassport/true");
  }
  continue(){

    this.router.navigateByUrl(this.nextPage);
  }
}
