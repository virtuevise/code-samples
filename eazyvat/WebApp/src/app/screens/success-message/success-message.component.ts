import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-success-message',
  templateUrl: './success-message.component.html',
  styleUrls: ['./success-message.component.scss']
})
export class SuccessMessageComponent implements OnInit {

  constructor(public modalPopup: MatDialogRef<SuccessMessageComponent>) { }

  ngOnInit(): void {
  }
  goToSummary() {
    this.modalPopup.close();
  }
}
