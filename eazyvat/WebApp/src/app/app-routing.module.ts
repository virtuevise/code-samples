import { HomeComponent } from './screens/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SplashScreenComponent } from './screens/splash-screen/splash-screen.component';
import { RefundInfoComponent } from './screens/refund-info/refund-info.component';
import { AddCreditCardComponent } from './screens/add-credit-card/add-credit-card.component';
import { PaymentDetailsComponent } from './screens/payment-details/payment-details.component';
import { WelcomeToEazyvatComponent } from './screens/welcome-to-eazyvat/welcome-to-eazyvat.component';
import { MemberConnectionDetailsComponent } from './screens/member-connection-details/member-connection-details.component';
import { AccountDetailsComponent } from './screens/account-details/account-details.component';
import { ScanPassportComponent } from './screens/scan-passport/scan-passport.component';
import { TripDetailsComponent } from './screens/trip-details/trip-details.component';
import { LinksOptionsComponent } from './screens/links-options/links-options.component';
import { EazyPassCompleteComponent } from './screens/eazy-pass-complete/eazy-pass-complete.component';
import { ErrorMessageComponent } from './screens/error-message/error-message.component';
import { SuccessMessageComponent } from './screens/success-message/success-message.component';
import { PurchasesDetailsComponent } from './screens/purchases-details/purchases-details.component';
import { PurchasesSummaryComponent } from './screens/purchases-summary/purchases-summary.component';
import { PurchaseDetailsByItemComponent } from './screens/purchase-details-by-item/purchase-details-by-item.component';
import { PdfResultComponent } from './screens/pdf-result/pdf-result.component';
import { ItemDetailsComponent } from './screens/item-details/item-details.component';
import { NoVATRefundComponent } from './screens/no-vat-refund/no-vat-refund.component';
import { InfoMessageComponent } from './screens/info-message/info-message.component';
import { PaymentSummaryComponent } from './screens/payment-summary/payment-summary.component';
import { AddInvoiceComponent } from './screens/add-invoice/add-invoice.component';
import { OopsMessageComponent } from './screens/oops-message/oops-message.component';
import { NavigationComponent } from './screens/navigation/navigation.component';
  import { RouteGuard } from './services/route-control.service';  
import { MapsComponent } from './screens/maps/maps.component';
import { ShopDetailsMessageComponent } from './screens/shop-details-message/shop-details-message.component';
import { EazyPassUpdateComponent } from './screens/eazy-pass-update/eazy-pass-update.component';
import { LoginGuard } from './services/login-guard';
import { ContactUsComponent } from './screens/contact-us/contact-us.component';


// const routes: Routes = [
//   {
//     path: '',
//     redirectTo: 'splash',
//     pathMatch: 'full',
//   },
//   {
//     path: 'splash',
//     component: SplashScreenComponent,
//     canActivate: [RouteGuard] 
//   },
//   {
//     path: "home",
//     component: HomeComponent,
//      canActivate: [RouteGuard]
//   },
//   {
//     path: "info/:status",
//     component: RefundInfoComponent,
//    canActivate: [RouteGuard] 
//   },
//   {
//     path: "addCreditCard/:status",
//     component: AddCreditCardComponent,
//      canActivate: [RouteGuard] 
//   },
//   {
//     path: "paymentDetails",
//     component: PaymentDetailsComponent,
//     canActivate: [RouteGuard]
//   },
//   {
//     path: "PaymentSummary",
//     component: PaymentSummaryComponent,
//     canActivate: [RouteGuard]
//   },
//   {
//     path: "welcomeToEazyvat",
//     component: WelcomeToEazyvatComponent,
//     canActivate: [RouteGuard] 
//   },
//   {
//     path: "memberConnectionDetails/:status",
//     component: MemberConnectionDetailsComponent,
//      canActivate: [RouteGuard] 
//   },
//   {
//     path:"accountDetails/:status",
//     component:AccountDetailsComponent,
//      canActivate: [RouteGuard] 
//   },
//   {
//     path:"scanPassport/:status",
//     component:ScanPassportComponent,
//      canActivate: [RouteGuard] 
//   },
//   {
//   path:"tripDetails/:status",
//   component: TripDetailsComponent,
//    canActivate: [RouteGuard] 
//   },
//   {
//   path:"linksOptions",
//   component: LinksOptionsComponent,
//   canActivate: [RouteGuard] 
//   },
//   {
//   path:"EazyPassComplete/:status/:flag",
//   component: EazyPassCompleteComponent,
//   canActivate: [RouteGuard] 
//   },
//   {
//     path:"errorMessage",
//     component: ErrorMessageComponent,
//     canActivate: [RouteGuard] 
//   },
//   {
//     path:"successMessage",
//     component: SuccessMessageComponent,
//     canActivate: [RouteGuard] 
//   }, 
//   {
//     path:"purchasesSummary",
//     component: PurchasesSummaryComponent,
//      canActivate: [RouteGuard] 
//   }, 
//   {
//     path:"purchasesDetails",
//     component: PurchasesDetailsComponent,
//      canActivate: [RouteGuard] 
//   }, 
//   {
//     path:"purchasesDetailsByItem",
//     component: PurchaseDetailsByItemComponent,
//      canActivate: [RouteGuard] 
//   }, 
//   {
//     path:"pdfResult",
//     component: PdfResultComponent,
//      canActivate: [RouteGuard] 
//   }, 

//   {
//     path:"itemDetails",
//     component: ItemDetailsComponent,
//      canActivate: [RouteGuard] 
//   }, 

  
//   {
//     path:"noVATRefund",
//     component: NoVATRefundComponent,
//      canActivate: [RouteGuard] 
//   }, 
//   {
//     path:"InfoMessage",
//     component: InfoMessageComponent,
//      canActivate: [RouteGuard] 
//   }, 
//   {
//     path:"AddInvoice",
//     component: AddInvoiceComponent,
//      canActivate: [RouteGuard] 
//   }, 
//   {
//     path:"OopsMessage",
//     component: OopsMessageComponent,
//      canActivate: [RouteGuard] 
//   },
//   {
//     path:"navigation",
//     component: NavigationComponent,
//      canActivate: [RouteGuard] 
//   },
//   {
//     path:"maps",
//     component: MapsComponent,
//   },  
//   {
//     path:"ShopDetailMessage",
//     component: ShopDetailsMessageComponent,
//   }, 
// {
//   path:"EazyPassUpdate/:status",
//   component:EazyPassUpdateComponent,
// }

// ];

const routes: Routes = [
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full',
  },
  {
    // path:"localhost:4200",
    path:"test-eazyvat2-app.azurewebsites.net",
    component: HomeComponent
  },
  {
    path: 'splash',
    component: SplashScreenComponent,
    // canActivate: [RouteGuard]
  },
  {
    path: "home",
    component: HomeComponent,
    canActivate: [RouteGuard]//loginguard REMOVED
  },
  {
    path: "info/:status",
    component: RefundInfoComponent,
    canActivate: [RouteGuard,LoginGuard]
  },
  {
    path: "addCreditCard/:status",
    component: AddCreditCardComponent,
    canActivate: [RouteGuard]
  },
  {
    path: "paymentDetails",
    component: PaymentDetailsComponent,
    canActivate: [RouteGuard,LoginGuard]
  },
  {
    path: "PaymentSummary",
    component: PaymentSummaryComponent,
    canActivate: [RouteGuard,LoginGuard]
  },
  {
    path: "welcomeToEazyvat",
    component: WelcomeToEazyvatComponent,
    // canActivate: [RouteGuard]
  },
  {
    path: "memberConnectionDetails/:status",
    component: MemberConnectionDetailsComponent,
    canActivate: [RouteGuard]
  },
  {
    path: "accountDetails/:status/:flag",
    component: AccountDetailsComponent,
    canActivate: [RouteGuard]
  },
  {
    path: "scanPassport/:status/:flag",
    component: ScanPassportComponent,
    canActivate: [RouteGuard]
  },
  {
    path: "tripDetails/:status",
    component: TripDetailsComponent,
    canActivate: [RouteGuard]
  },
  {
    path: "linksOptions",
    component: LinksOptionsComponent,
    canActivate: [RouteGuard]
  },
  {
    path: "EazyPassComplete/:status/:flag",
    component: EazyPassCompleteComponent,
    canActivate: [RouteGuard]
  },
  {
    path: "errorMessage",
    component: ErrorMessageComponent,
    canActivate: [RouteGuard]
  },
  {
    path: "successMessage",
    component: SuccessMessageComponent,
    canActivate: [RouteGuard]
  },
  {
    path: "purchasesSummary",
    component: PurchasesSummaryComponent,
    canActivate: [RouteGuard]
  },
  {
    path: "purchasesDetails",
    component: PurchasesDetailsComponent,
    canActivate: [RouteGuard]
  },
  {
    path: "purchasesDetailsByItem",
    component: PurchaseDetailsByItemComponent,
    canActivate: [RouteGuard]
  },
  {
    path: "pdfResult",
    component: PdfResultComponent,
    canActivate: [RouteGuard]
  },

  {
    path: "itemDetails",
    component: ItemDetailsComponent,
    canActivate: [RouteGuard]
  },


  {
    path: "noVATRefund",
    component: NoVATRefundComponent,
    canActivate: [RouteGuard]
  },
  {
    path: "InfoMessage",
    component: InfoMessageComponent,
    canActivate: [RouteGuard]
  },
  {
    path: "AddInvoice",
    component: AddInvoiceComponent,
    canActivate: [RouteGuard]
  },
  {
    path: "OopsMessage",
    component: OopsMessageComponent,
    canActivate: [RouteGuard]
  },
  {
    path: "navigation",
    component: NavigationComponent,
    canActivate: [RouteGuard]
  },
  {
    path: "maps",
    component: MapsComponent,
    canActivate: [RouteGuard]
  },
  {
    path: "ShopDetailMessage",
    component: ShopDetailsMessageComponent,
  },
  {
    path: "EazyPassUpdate/:status",
    component: EazyPassUpdateComponent,
  },
  {
    path: "contactUs",
    component: ContactUsComponent,
    canActivate: [RouteGuard]
  },   
  { path: '**',
   component: HomeComponent,
  canActivate: [RouteGuard] }

];
@NgModule({
  imports: [RouterModule.forRoot(routes,{
    useHash: false,
    initialNavigation: 'enabled',
    relativeLinkResolution: 'legacy'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
