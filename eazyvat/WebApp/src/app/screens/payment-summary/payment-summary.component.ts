import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-summary',
  templateUrl: './payment-summary.component.html',
  styleUrls: ['./payment-summary.component.scss']
})
export class PaymentSummaryComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  goToCredit() {
  this.router.navigateByUrl('/addCreditCard/true');
  }
}
