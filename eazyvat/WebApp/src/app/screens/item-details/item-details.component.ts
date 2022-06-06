import { Invoice } from './../../model/invoice-details.model';
import { InvoiceItem } from './../../model/invoice-details.model';
import { Component, OnInit } from '@angular/core';
import { PurchaseService } from 'src/app/services/purchase.service';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss']
})
export class ItemDetailsComponent implements OnInit {
  ItemNumber:string=""
  public model: Invoice = new Invoice();
  public item:InvoiceItem[];
  purchaseId: string;
  constructor(private purchaseService: PurchaseService, private route: ActivatedRoute) { }

  async ngOnInit() {
    try {
      this.purchaseId = this.route.snapshot.queryParams['id'];
      debugger
      await this.purchaseService.getInvoiceItems(this.purchaseId).subscribe((data) => {
        debugger
        for(let i=0; i<data.responseData.length; i++){
          data.responseData[i].price=data.responseData[i].price+" NIS";
          data.responseData[i].total=data.responseData[i].total+" NIS"
        }
        this.item = data.responseData;
        

      });
    } catch (error) {
      console.error(error);
    }
  }

}
