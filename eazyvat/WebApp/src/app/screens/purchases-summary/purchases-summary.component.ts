import { Router } from "@angular/router";
import { PurchaseService } from "./../../services/purchase.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { PurchaseSummary } from "src/app/model/purchase-summary.model";
import { Subscription } from "rxjs";
import { AppContextService } from "src/app/services/app-context.service";
import { MatDialog } from "@angular/material/dialog";
import { InfoMessageComponent } from "../info-message/info-message.component";
import { OopsMessageComponent } from 'src/app/screens/oops-message/oops-message.component';
import {AccountService} from '../../services/account.service'

@Component({
  selector: 'app-purchases-summary',
  templateUrl: './purchases-summary.component.html',
  styleUrls: ['./purchases-summary.component.scss']
})
export class PurchasesSummaryComponent implements OnInit,OnDestroy {
  sumTotal='2000';
  sumVat='340';
  public model: PurchaseSummary = new PurchaseSummary();
  public subscriptionSignalEvent: Subscription;
  IsShow = false;
  constructor(
    public appCtx: AppContextService,
    private dialog: MatDialog,
    private PurchaseService: PurchaseService,
    private router: Router,
    private AccountService:AccountService
  ) {}
  ngOnDestroy(): void {
    debugger;
   this.closeDialog();
  }

  async ngOnInit() {
      try{
      const passId = this.AccountService.passportId;
     await this.PurchaseService.getPurchasesSummary(passId).subscribe((data:any)=>{
        if(data.statusCode == 200){
          this.model.Total=this.calculationTotal(data.responseData);
          this.model.VatReclaim=this.calculationVat(data.responseData); 
        }  
      else{
        this.IsShow = true;
        this.openOops();
      }
     });
    if (!this.AccountService.passportId) {
      const memId = this.AccountService.JwtDecoder(localStorage.getItem("token"));
      await this.AccountService.getAccountProfile(memId).subscribe((data: any) => {
        if (data.statusCode == 200) {
          const { result } = data.responseData;
          this.AccountService.passportId = result.id;
        }   
        const passportId = this.AccountService.passportId;
        this.PurchaseService.getPurchaseNewCount(passportId).subscribe((data:any)=>{
         this.PurchaseService.purchaseCount.next(data.responseData);
       });
      }); 
    }
  }
  
  catch (error) {
    console.info(error);
  }
     
  }

  calculationTotal(dataPurchases){
     var Total=0;
     for(let i=0; i<dataPurchases.length; i++){   
        Total += dataPurchases[i].purchaseAmount;  
     }
     return Total.toFixed(2);
  }

  calculationVat(dataPurchases){
     var Vat=0;
     for(let i=0; i<dataPurchases.length; i++){
       if(dataPurchases[i].isValid==true)
       {
        Vat += dataPurchases[i].vatAmount;
       }
     }
     return Vat.toFixed(2);
  }

  openOops() {
    const dialogRef = this.dialog.open(OopsMessageComponent, { 
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(result => { 
      this.IsShow=true;
    });
  }
  closeDialog() {
    this.dialog.closeAll();
}

  openInfo() {
    const dialogRef = this.dialog.open(InfoMessageComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
