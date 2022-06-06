import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-passport-error-message',
  templateUrl: './passport-error-message.component.html',
  styleUrls: ['./passport-error-message.component.scss']
})
export class PassportErrorMessageComponent implements OnInit {

  constructor(public modalPopup: MatDialogRef<PassportErrorMessageComponent>) { }

  ngOnInit(): void {
  }
  goToScanPass() {
    this.modalPopup.close();
  }
}
