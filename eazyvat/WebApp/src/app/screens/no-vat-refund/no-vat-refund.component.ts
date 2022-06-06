import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-no-vat-refund',
  templateUrl: './no-vat-refund.component.html',
  styleUrls: ['./no-vat-refund.component.scss']
})
export class NoVATRefundComponent implements OnInit {
  NoVATRefundReasone='Minimum invoice amount must exceed 125 NIS'
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  goToPurchaseDet() {
    this.router.navigateByUrl('purchasesDetails');
  }
}
