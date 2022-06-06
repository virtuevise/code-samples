import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { IPurchaseDetails } from 'src/app/model/purchase-details.model';
import { AccountService } from 'src/app/services/account.service';
import { PurchaseService } from 'src/app/services/purchase.service';

@Component({
  selector: 'app-one-purchase',
  templateUrl: './one-purchase.component.html',
  styleUrls: ['./one-purchase.component.scss']
})
export class OnePurchaseComponent implements OnInit {
  isShowNewRed: boolean = false;
  // public model: IPurchaseDetails;
  purchaseSum: any = [];

  constructor(private purchaseService: PurchaseService, private router: Router, private AccountService: AccountService) { }

  async ngOnInit() {
    let memId = this.AccountService.passportId;
    await this.purchaseService.getPurchasesSummary(memId).subscribe((data: any) => {
       if (data.statusCode == 200) {
        data.responseData.forEach(element => {
           let data = {
            id: element.id,
            Amount: element.purchaseAmount,
            isValid: element.isValid,
            isNew: element.isNew,
            img:"../../../assets/icons/"+element.shopDetails.logo,
            Vat: element.vatAmount,
            shopName: element.shopDetails.name,
            datePurchase: element.datePurchase
          }
          this.purchaseSum.push(data)
        });
      }
    });
  }
  goToDet(index) {
    this.purchaseService.purchaseId = this.purchaseSum[index].id;
    let purchaseId = this.purchaseService.purchaseId;
    let memId = this.AccountService.passportId;
    this.purchaseService.resetPurchaseById(memId, purchaseId).subscribe((data: any) => {
      this.purchaseService.getPurchaseNewCount(memId).subscribe((data: any) => {
        this.purchaseService.purchaseCount.next(data.responseData);
      });
    });
    this.router.navigate(['/purchasesDetails'], { queryParams: { Id: purchaseId } });

  }
}
