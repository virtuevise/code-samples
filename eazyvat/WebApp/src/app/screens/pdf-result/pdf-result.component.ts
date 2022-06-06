import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PurchaseService } from 'src/app/services/purchase.service';
@Component({
  selector: 'app-pdf-result',
  templateUrl: './pdf-result.component.html',
  styleUrls: ['./pdf-result.component.scss']
})
export class PdfResultComponent implements OnInit {
  purchaseData: any;
  src:string;
  constructor(private purchaseService: PurchaseService,private route: ActivatedRoute,private router: Router) { }

  ngOnInit() {
    this.getPdfData();
  }
  getPdfData() {
    debugger
    const purchaseId = this.purchaseService.purchaseId;
    let resData = this.purchaseService.getPurchasesSummaryById(purchaseId).subscribe((data: any) => {
      debugger;
      if (data.status == 200) {
        this.purchaseData = data.responseData;
        const byteArray = new Uint8Array(atob(this.purchaseData.referencePdf).split('').map(char => char.charCodeAt(0)));
        const blob = new Blob([byteArray], {type: 'application/pdf'});
       this.src = window.URL.createObjectURL(blob);
      }
      console.info(this.purchaseData);
    });

  }
  goToPurchaseDet() {
    const purchaseId = this.route.snapshot.queryParams['Id'];
    this.router.navigateByUrl(`/purchasesDetails?id=${purchaseId}`);
  }
}
