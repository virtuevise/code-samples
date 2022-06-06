import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PurchaseDetails } from 'src/app/model/purchase-details.model';
import { PurchaseService } from 'src/app/services/purchase.service';

@Component({
  selector: 'app-purchase-details-by-item',
  templateUrl: './purchase-details-by-item.component.html',
  styleUrls: ['./purchase-details-by-item.component.scss']
})
export class PurchaseDetailsByItemComponent implements OnInit {
  public model: PurchaseDetails = new PurchaseDetails();
  purchaseData: any = {};
  constructor(
    private router: Router,
    private purchaseService:PurchaseService,

    ) { }

  ngOnInit(): void {
    // this.model.ShopName='ZARA';
    // this.model.DatePurchase=new Date('01/01/21')
    // this.model.Sum=2000;
    // this.model.VatReclaim=340;
    // this.model.InvoiceNumber=7686834217
    // this.model.DatePurchase=new Date()
    // this.model.FullShopAddress='Ayalon Mall, Abba Hillel Silver 301 Ramat Gan'

    try { 
      let purchaseId = this.purchaseService.purchaseId;
       this.purchaseService.getPurchasesSummaryById(purchaseId).subscribe((data: any) => {
         if (data.status == 200) {
         this.purchaseData = data.responseData;
        }   
    });
    } catch (error) {
      console.info(error);
    }
  }
  goToPurchaseDet() {
    this.router.navigateByUrl('purchasesDetails');
  }
}
