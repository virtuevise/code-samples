import { PurchaseDetails } from 'src/app/model/purchase-details.model';
import { PurchaseService } from 'src/app/services/purchase.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { FormGroup } from '@angular/forms';
import { AccountService } from 'src/app/services/account.service';


@Component({
  selector: 'app-purchases-details',
  templateUrl: './purchases-details.component.html',
  styleUrls: ['./purchases-details.component.scss']
})
export class PurchasesDetailsComponent implements OnInit {
  isShowInvoiceImg: boolean = true;
  isShowStatusApprove: boolean=false ;
  isShowStatusNoRefund: boolean = true;
  isShowbanner;
  VatReclaims:string;
  Amount:string;
  // purchaseData: any = {} ; 
  purchaseData:  {
    datePurchase: string,
    shopName: string,
    shopAdress: string,
    Amount:string,
    invoiceNumber:string,
    VatReclaims:string,
    purchaseAmount:string,
    vatAmount:string,
    isValid:boolean
  } ;

  myForm= new FormGroup({

  })
  purchaseId: string;

  public model: PurchaseDetails = new PurchaseDetails();
    constructor(private spinner: SpinnerVisibilityService,private purchaseService: PurchaseService, private route: ActivatedRoute, private router: Router,private AccountService:AccountService) { }

  async ngOnInit() {
   // debugger;
    this.spinner.show();
    try { 
      this.purchaseId = this.purchaseService.purchaseId;
      await this.purchaseService.getPurchasesSummaryById(this.purchaseId).subscribe((data: any) => {
         if (data.status == 200) {
           debugger
         this.isShowbanner = true;
         this.purchaseData = data.responseData;
         this.Amount=this.purchaseData.purchaseAmount+"  NIS";
         this.VatReclaims =this.purchaseData.vatAmount+"  NIS";      
         this.isShowStatusApprove=this.purchaseData.isValid;
        }   
    });
    } catch (error) {
      console.info(error);
    }

    setTimeout(() => {
      this.spinner.hide();
    }, 3000);
  }

  // getPurchaseDetailsById() {
    
  // }

  goToSummary() {
    this.router.navigateByUrl('/purchasesSummary');
  }
  /*  async ngOnInit() {
 
     try {
       const purchaseId = this.route.snapshot.paramMap.get('id');
 
       this.model = await this.purchaseService.getPurchase(purchaseId);
 
     } catch (error) {
       console.info(error);
     }
   } */

  onSelectInvoice() {

    this.router.navigate(['/invoice-details/' + this.model.Id]);

  }

  goToPdf() {
    const purchaseId = this.route.snapshot.queryParams['Id'];
    this.router.navigateByUrl(`/pdfResult?Id=${purchaseId}`);
  }
}
 
 
 
 
