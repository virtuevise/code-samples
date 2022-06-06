import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OopsMessageComponent } from 'src/app/screens/oops-message/oops-message.component';
import { AccountService } from 'src/app/services/account.service';
import { HomenavControlService } from 'src/app/services/homenav-control.service';
import { PurchaseService } from 'src/app/services/purchase.service';

@Component({
  selector: 'app-launch-menu',
  templateUrl: './launch-menu.component.html',
  styleUrls: ['./launch-menu.component.scss']
})
export class LaunchMenuComponent implements OnInit {

  isShowNewPurchases: boolean = false;
  countNewPurchases: number;
  constructor(private PurchaseService: PurchaseService, private router: Router, public dialog: MatDialog, public user: HomenavControlService, private AccountService: AccountService) {
    this.PurchaseService.purchaseCount.subscribe(res => {
      debugger
      if (localStorage.getItem("token")) {
        if (res <= 0 || res == undefined) {
          this.isShowNewPurchases = false
        } else {
          this.isShowNewPurchases = true;
          this.countNewPurchases = res;
        }
      } else {
        this.isShowNewPurchases = false;
      }

    });
  }

  onClickHome() {
    debugger
    this.iconStandart()
    this.user.isShowIconHomeBold = !this.user.isShowIconHomeBold;
    this.PurchaseService.navIconInHome.next(false);
    this.router.navigate(['home']);
  }
  onClickPurchases() {
    debugger
    this.iconStandart();
    this.PurchaseService.navIconInHome.next(true);
    this.user.isShowIconPurBold = !this.user.isShowIconPurBold;
    this.cheackStatusPurchases()
    if (localStorage.getItem("token")) {
      this.checkNewPurchases();
      this.router.navigateByUrl("purchasesSummary");
    } else {
      this.router.navigateByUrl("welcomeToEazyvat")
    }
  }
  openOops() {
    const dialogRef = this.dialog.open(OopsMessageComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  onClickShop() {
    this.PurchaseService.navIconInHome.next(true);
    this.iconStandart()
    this.user.isShowIconShopBold = !this.user.isShowIconShopBold;
    this.router.navigate(['maps']);
    /* this.router.navigate(['tripDetails/:true']);  */


  }
  onClickProfil() {
    debugger
    this.iconStandart();
    this.PurchaseService.navIconInHome.next(true);
    this.user.isShowIconProBold = !this.user.isShowIconProBold;
    // this.router.navigate(['linksOptions']);
    if (localStorage.getItem("token")) {
      this.router.navigate(['linksOptions']);
    } else {
      this.router.navigateByUrl("welcomeToEazyvat");
    }
  }
  iconStandart() {
    this.user.isShowIconHomeBold = false;
    this.user.isShowIconPurBold = false;
    this.user.isShowIconShopBold = false;
    this.user.isShowIconProBold = false;
  }

  async ngOnInit() {

    // let memId = this.AccountService.JwtDecoder(localStorage.getItem("Token"));
    // await this.AccountService.getAccountProfile(memId).subscribe((data: any) => {
    //   if (data.statusCode == 200) {
    //     const { result } = data.responseData;
    //     this.PurchaseService.purchaseId = result.id;
    //   }    
    // });
    this.checkNewPurchases()
  }

  cheackStatusPurchases() {

    const token = sessionStorage.getItem("token");
    /*     let userId = "910FD9F1-1B66-4650-A229-08D8DC218ABA"; */
    // let userId = undefined
    if (localStorage.getItem("token")) //if token? or if userId?
    {  //If a user is registered:
      let userId = this.AccountService.passportId;
      this.PurchaseService.getPurchaseCount(userId).subscribe((data: any) => {
        if (data.status == 200) {

          if (data.responseData > 0) //If a user is registered with purchases
          {
            this.router.navigate(['purchasesSummary']);
          }
          else //If a user is registered with not purchases
          {

          }
        }
      });

    }

    else { //If a user is not registered:   
      this.router.navigate(['welcomeToEazyvat']);
    }
  }

  checkNewPurchases() {
    const token = sessionStorage.getItem("token");
    let userId = this.AccountService.passportId;
    if (localStorage.getItem("token")) //if token? or if userId?
    {  //If a user is registered:
      this.PurchaseService.getPurchaseNewCount(userId).subscribe((data: any) => {
        if (data.status == 200) {

          if (data.responseData > 0) {
            this.countNewPurchases = data.responseData
            this.isShowNewPurchases = true
          }
          else {
            this.isShowNewPurchases = false
          }
        }
      });

    }
  }

}
