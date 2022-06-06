import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountProfile } from 'src/app/model/account-profile.model';
import { AccountService } from 'src/app/services/account.service';
import { MemberService } from 'src/app/services/member.service';


declare var LiveAgent: any;

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

  public models: AccountProfile = new AccountProfile();
  memId: string = "";
  firstName : string = "";
  lastName : string = "";
  country : string ="";
  passport : string="";
  email : string ="";
  phone : string="";
  userDetails: any ={};
  u: any ={};
 
  

  constructor(private route: ActivatedRoute,private AccountService:AccountService,private memberService: MemberService) { }

   ngOnInit() {
    debugger
    this.getUserDetails()
    
     const user={
      email:"",
      firstName:"",
      lastName:"",
      phone:""
     }
    
    
     debugger
    let scriptUrl='https://eazyvat.ladesk.com/scripts/track.js';
    let node=document.createElement('script');
    node.src=scriptUrl;
    node.id='la_x2s6df8d';
    node.type='text/javascript';
    node.async=true;
    node.charset='utf-8';
    debugger
    node.onload=function(e){
      LiveAgent.createForm('kazkno3v',document.getElementById("chatButton"));
      LiveAgent.setUserDetails(user.email, user.firstName, user.lastName, user.phone);
      // LiveAgent.setUserDetails();  
     

    };
    document.getElementsByTagName('head')[0].appendChild(node);
  }

  async getUserDetails(){
debugger
    if (localStorage.getItem("Token")) 
 {  
     var details={};
     localStorage.setItem("token",localStorage.getItem("Token"));     
     const memId = this.AccountService.JwtDecoder(localStorage.getItem("token"));
    try {  
      localStorage.setItem("token",localStorage.getItem("Token"));     
      const memId = this.AccountService.JwtDecoder(localStorage.getItem("token"));
      await this.AccountService.getAccountProfile(memId).subscribe((data: any) => {
        if (data.statusCode == 200) {
          const { result } = data.responseData;
          this.firstName = result.firstName;
          this.lastName = result.lastName;
          this.country= result.nationality;
          this.passport=result.passportNumber;
        
        }     
      });
   

    } catch (error) {
      console.info(error);
    }
    try 
    {
      this.memId = this.AccountService.JwtDecoder(localStorage.getItem("Token"));
      await this.memberService.getPersonalDetails(this.memId).subscribe((data: any) => {
        if (data.statusCode == 200) {
          const { result } = data.responseData;
          this.email = result.email;
          this.phone=result.mobileNumber
          this.userDetails ={ 
            email: this.email ,
            phone: this.phone ,
            firstName: this.firstName, 
            lastName : this.lastName,
            country: this.country,
            passport:this.passport,  
          }
         
        } 
        debugger
        
      });
        
    } 
    catch (error) {
      console.info(error);
      return null;
    }
   

  }
 
  
  
}

}