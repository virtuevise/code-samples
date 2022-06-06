import { Component, Input, OnInit } from '@angular/core';
import { PassportDetails } from 'src/app/model/passport-details.model';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService } from "src/app/services/account.service";
import { AccountProfile } from "src/app/model/account-profile.model";


@Component({
  selector: 'app-eazy-pass-update',
  templateUrl: './eazy-pass-update.component.html',
  styleUrls: ['./eazy-pass-update.component.scss']
})
export class EazyPassUpdateComponent implements OnInit {
  status: boolean;
  statusUpdate: boolean = false;
  memberName = 'Nitzan';
  nextPage: string;
  public model: AccountProfile = new AccountProfile();



  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private AccountService: AccountService,


  ) { }

  async ngOnInit() {
    try {
      let memId = this.AccountService.JwtDecoder(localStorage.getItem("Token"));
      await this.AccountService.getAccountProfile(memId).subscribe((data: any) => {
        if (data.statusCode == 200) {
          const { result } = data.responseData;
          // this.model.FirstName = result.firstName;
          // this.model.LastName = result.lastName;
          // this.model.Nationality = result.nationality;
          // this.model.PassportNumber = result.passportNumber;
          this.model.BirthDate = result.birthDate;
          this.model.IssueDate = result.issueDate;
          this.model.ExpiredOn = result.expiredOn;
        }
      });
      this.model.FirstName = 'NITZAN'
      this.model.LastName = 'MEIRAV'
      this.model.PassportNumber = '22794551'
      this.model.Nationality = "Israel";
    } catch (error) {
      console.info(error);
    }
    try {
      const status = this.route.snapshot.paramMap.get('status');
      this.status = JSON.parse(status);
      if (this.status == true)  //manage status
      {
        this.nextPage = 'scanPassport';
      
      }
      else
        this.nextPage = 'addCreditCard';

    } catch (error) {
      console.info(error);
    }
  }
  goToScanPass() {
    this.router.navigateByUrl("/scanPassport/true");
  }
}
