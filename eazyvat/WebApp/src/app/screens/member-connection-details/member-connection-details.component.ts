import { Component, Input, OnInit } from '@angular/core';
import { MemberService } from './../../services/member.service';
import { PersonalDetails } from 'src/app/model/member-details.model';
import { Router, ActivatedRoute } from '@angular/router';
import {AccountService} from '../../services/account.service';
@Component({
  selector: 'app-member-connection-details',
  templateUrl: './member-connection-details.component.html',
  styleUrls: ['./member-connection-details.component.scss']
})
export class MemberConnectionDetailsComponent implements OnInit {
  memId: string = "";
  status: boolean;
  public model: PersonalDetails = new PersonalDetails();



  constructor(private router: Router, private route: ActivatedRoute, private memberService: MemberService,private AccountService:AccountService) { }

  async ngOnInit() {
    try {
      // this.model = await this.memberService.getPersonalDetails();
      this.memId = this.AccountService.JwtDecoder(localStorage.getItem("Token"));
      await this.memberService.getPersonalDetails(this.memId).subscribe((data: any) => {
        if (data.statusCode == 200) {
          const { result } = data.responseData;
          this.model.Email = result.email;
          this.model.MobileNumber = result.mobileNumber;
          this.model.RegionMobileNumber = result.regionMobileNumber;
        }
      });
    } catch (error) {
      console.info(error);
    }
    try {
      const status = this.route.snapshot.paramMap.get('status');
      this.status = JSON.parse(status);

    } catch (error) {
      console.info(error);
    }
  }
  goToEazyPass() {
    this.router.navigateByUrl("/EazyPassComplete/false/no");
  }
  updateName() {
    debugger
    console.info(this.model);
    let data = {
      Email: this.model.Email,
      MobileNumber: this.model.MobileNumber,
      MemberId: this.memId
    }
    this.memberService.updatePersonalDetails(data).subscribe((data: any) => {
      debugger
      if (data.statusCode == 200) {
        if( this.status==false)
         this.router.navigateByUrl(`/tripDetails/${this.status}`);
        else
         this.router.navigateByUrl("/linksOptions");
      } else {
        console.info(data.message);
      }
    })
  }
}
