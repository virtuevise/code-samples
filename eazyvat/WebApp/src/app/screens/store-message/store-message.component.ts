import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { Inject } from '@angular/core';


@Component({
  selector: 'app-store-message',
  templateUrl: './store-message.component.html',
  styleUrls: ['./store-message.component.scss']
})
export class StoreMessageComponent implements OnInit {
  StoreName:string="";
  StoreAddres:string="";

  constructor(public modalPopup: MatDialogRef<StoreMessageComponent>, @Inject(MatDialog) public data: any) { }

  ngOnInit(): void {

    alert(this.data);
  }
  goToSummary() {
    this.modalPopup.close();
  }
}
