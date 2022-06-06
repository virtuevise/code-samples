import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { PassportDetails } from 'src/app/model/passport-details.model';
import { MemberService } from 'src/app/services/member.service';
import { MatDialog,MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InfoMessageComponent } from '../info-message/info-message.component';
import { OopsMessageComponent } from '../oops-message/oops-message.component';
import { SuccessMessageComponent } from '../success-message/success-message.component';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { Router } from '@angular/router';
import { HomenavControlService } from 'src/app/services/homenav-control.service';
import { AccountProfile } from 'src/app/model/account-profile.model';
import { LoginGuard } from 'src/app/services/login-guard';
import { TranslateService } from '@ngx-translate/core';


import { locale as english } from 'src/assets/i18n/en';
import {locale as french} from 'src/assets/i18n/fn';
import { TranslationLoaderService } from 'src/app/services/translation-loader.service';
import { AccountService } from 'src/app/services/account.service';
import { PurchaseService } from 'src/app/services/purchase.service';
// import { AccountProfile } from "src/app/model/account-profile.model";
// import {AccountService} from '../../services/account.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  isShowLogo = false;
  userName : string = "";
  defaultLang:any;
  public model: PassportDetails;
  public models: AccountProfile = new AccountProfile();
  constructor(  private _translationLoader: TranslationLoaderService,
    private _translateService: TranslateService,
    public user: HomenavControlService, 
    private memberService: MemberService,
    public homenav: HomenavControlService, 
    public dialog: MatDialog,
    private router: Router,
    private AccountService:AccountService,
    private PurchaseService:PurchaseService
       ) {
         this.PurchaseService.navIconInHome.next(false);
        _translateService.addLangs(['en', 'fn']);
        _translateService.setDefaultLang('en');
        this.PurchaseService.defaultLang.subscribe(res=>{
          this.defaultLang = res;
        });
        _translateService.use(this.defaultLang);
        _translationLoader.loadTranslations(
          english,
          french);
          if(window.location.pathname.match('/home'))
      {
        this.router.navigateByUrl("home/");
      }

        }

  async ngOnInit() {      
    setTimeout(async () => {
      this.isShowLogo = true;
    }, 3000);

    try {        
      const memId = this.AccountService.JwtDecoder(localStorage.getItem("token"));
      await this.AccountService.getAccountProfile(memId).subscribe((data: any) => {
        if (data.statusCode == 200) {
          const { result } = data.responseData;
          this.userName = result.firstName;
          this.AccountService.passportId = result.id;
          this.AccountService.passportData = result.firstName;
          this.PurchaseService.getPurchaseNewCount(result.id).subscribe((data:any)=>{
            debugger
            this.PurchaseService.purchaseCount.next(data.responseData);
          });
        }     
      });
    } catch (error) {
      console.info(error);
    }

    // try {
    //   debugger
    //   let passportId = this.AccountService.passportId;
    //   this.model = await this.memberService.getPassportDetails(passportId);
    // } catch (error) {
    //   console.info(error);
    // }

    // let isToken = sessionStorage.getItem("token");
    // if (isToken) {
    //   this.userName = sessionStorage.getItem("userName");
    // }
    
    // this.model.FirstName = this.userName;

    this.user.isShowIconHomeBold = true;
    this.user.isShowIconPurBold = false;
    this.user.isShowIconShopBold = false;
    this.user.isShowIconProBold = false;
    
  }

  openInfo() {
    const dialogRef = this.dialog.open(InfoMessageComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openOps() {
    const dialogRef = this.dialog.open(OopsMessageComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  openSuccess() {
    const dialogRef = this.dialog.open(SuccessMessageComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  openError() {
    const dialogRef = this.dialog.open(ErrorMessageComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  onClickPurchases() {
    const token = sessionStorage.getItem("token");
    if (token) {
      //If a user is registered:
      this.router.navigate(['purchasesSummary']);
    } else {
      //If a user is not registered:
      this.router.navigate(['welcomeToEazyvat']);
    }
  }
  navigatetoshhoppage() {
    this.homenav.isShowIconHomeBold = !this.homenav.isShowIconHomeBold;
    this.homenav.isShowIconShopBold = !this.homenav.isShowIconShopBold;
    this.router.navigate(['/maps']);
  }
  navigatetopurchasepage() {
    this.homenav.isShowIconHomeBold = !this.homenav.isShowIconHomeBold;
    this.homenav.isShowIconPurBold = !this.homenav.isShowIconPurBold;
    // this.router.navigate(['/welcomeToEazyvat']);
    if (localStorage.getItem("token")) {
      //If a user is registered:
      this.router.navigateByUrl("purchasesSummary");
    } else {
      //If a user is not registered:
      this.router.navigateByUrl("welcomeToEazyvat");
    }
  }
}
