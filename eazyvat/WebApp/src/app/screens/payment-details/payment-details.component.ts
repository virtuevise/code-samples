import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { PaymentService } from 'src/app/services/payment.service';
import { PurchaseService } from 'src/app/services/purchase.service';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.scss']
})
export class PaymentDetailsComponent implements OnInit {
  LastfourDigits = '7658'
  ExpirationDate = '04/26'
  cardData: any = [];
  constructor(
    private _paymentService: PaymentService,
    private AccountService:AccountService
    ) { }

  ngOnInit() {
    this.getSavedCards();
  }
  getSavedCards() {
    let userId = this.AccountService.passportId;
    // let userId = sessionStorage.getItem("UserId");
    this._paymentService.getUserSavedCards(userId).subscribe((data: any) => {
      if (data.length > 0) {
        data.forEach(element => {
          let maskedNumber = element.cardNumber;
          let data = {
            cardNumber: element.cardNumber,
            expiryMonth: element.expiryMonth,
            expiryYear: element.expiryYear,
            userId: element.userId,
            id: element.id,
            masked: maskedNumber.replace(/\d(?=\d{4})/g, "*")
          };
          this.cardData.push(data);
        });
      } else {
        console.info("No cards Found. Please Add One");
      }
    });
  }

  onClickRemoveCreditCard(dataCreditToDelete)
  {  
    ;
    let userId = this.AccountService.passportId;
    // let userId = sessionStorage.getItem("UserId");
    let data = {
      CardNumber: dataCreditToDelete.cardNumber,
      ExpiryYear: dataCreditToDelete.expiryYear,
      ExpiryMonth:dataCreditToDelete.expiryMonth,
      UserId: userId,
      CVV: dataCreditToDelete.CVV,
    }
    this._paymentService.DeleteUserCard(data).subscribe((data: any) => {
      ;
      if (data.statusCode==200) {
        ;
        this.cardData=this.cardData.filter(card => card.id != dataCreditToDelete.id);
      } else {
        console.info("Eror deleting credit card from database");
      }
    });

    
  }
}
