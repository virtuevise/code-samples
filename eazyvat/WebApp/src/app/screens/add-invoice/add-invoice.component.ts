import { Component,Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-invoice',
  templateUrl: './add-invoice.component.html',
  styleUrls: ['./add-invoice.component.scss']
})
export class AddInvoiceComponent implements OnInit {
@Input() isSavePicture:boolean=false;
@Input() isTakePicture:boolean=true;
 
  constructor(private router: Router) { }

  ngOnInit(): void {
    
  }
  onTakePictureInvoice(){
    this.isSavePicture=true;
    this.isTakePicture=false;
  }
  goToPurchaseDet() {
    this.router.navigateByUrl('purchasesDetails');
  }
}
