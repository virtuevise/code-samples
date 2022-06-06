import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { HomenavControlService } from 'src/app/services/homenav-control.service';
import {PurchaseService} from '../../services/purchase.service'
@Component({
  selector: 'app-links-options',
  templateUrl: './links-options.component.html',
  styleUrls: ['./links-options.component.scss']
})
export class LinksOptionsComponent implements OnInit {
  status:boolean;
  memberName:string;
  constructor(public user:HomenavControlService,
    private route:Router,
    private purchaseService:PurchaseService,
    private AccountService:AccountService
    ) { }

  ngOnInit(): void {
    //If there is a token per user
    debugger
    const memId = this.AccountService.JwtDecoder(localStorage.getItem("token"));
      this.AccountService.getAccountProfile(memId).subscribe((data: any) => {
        debugger
        if (data.statusCode == 200) {
          const { result } = data.responseData;
          this.memberName = result.firstName;
          this.status=true;
        }
      });
    //else
   /  this.status=false; /

   this.user.isShowIconHomeBold= false;
   this.user.isShowIconPurBold = false;
   this.user.isShowIconShopBold = false;
   this.user.isShowIconProBold = true;

  }
  logout(){debugger
    let logout = confirm("Are you sure you want to log out?")
    console.log(logout);
    if (logout == true) {
      localStorage.clear();
      this.purchaseService.purchaseCount.next(0);
      this.AccountService.passportId = undefined;
      this.route.navigateByUrl("home");
    }  }

}
