import { Component, OnInit } from '@angular/core';
import { dateInputsHaveChanged } from '@angular/material/datepicker/datepicker-input-base';
import { PurchaseDetails } from 'src/app/model/purchase-details.model';

@Component({
  selector: 'app-one-purchase-new',
  templateUrl: './one-purchase-new.component.html',
  styleUrls: ['./one-purchase-new.component.scss']
})
export class OnePurchaseNewComponent implements OnInit {
  public model: PurchaseDetails = new PurchaseDetails();
  
  constructor() { }

  ngOnInit(): void {
    this.model.ShopName='ZARA';
    this.model.DatePurchase=new Date('01/01/21')
    this.model.Sum=2000;
    this.model.VatReclaim=340;

  }

}
