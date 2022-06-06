import { Component, OnInit } from '@angular/core';
import { PassportDetails } from 'src/app/model/passport-details.model';
import { AccountService } from 'src/app/services/account.service';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'app-oops-message',
  templateUrl: './oops-message.component.html',
  styleUrls: ['./oops-message.component.scss']
})
export class OopsMessageComponent implements OnInit {
  userName : string = "uu";
  public model: PassportDetails;
  emailstring:string= "";

  constructor(private memberService: MemberService,private AccountService:AccountService ) { }

  async ngOnInit() {
   
    try {
      let passportId = this.AccountService.passportId;
      this.model = await this.memberService.getPassportDetails(passportId);
    } catch (error) {
      console.info(error);
    }
    let isToken = sessionStorage.getItem("token");
    if(isToken){
      this.userName = sessionStorage.getItem("UserName");
    }

    this.userName = "Nitzan";
  }

  // openMail(){
  //  this.emailstring= `mailto: support@eazyvat.com?Subject=Eazyvat support&body=Dear ${this.userName}
  //  %0D Thank you for contactong us.
  //  %0D Your call was recorded and we will get back to you shortly.
  //  %0D Regards,
  //  %0D Eazyvat support team.`;
  // }

}
