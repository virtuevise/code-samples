import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-info-message',
  templateUrl: './info-message.component.html',
  styleUrls: ['./info-message.component.scss']
})
export class InfoMessageComponent implements OnInit {
  status: boolean;

  constructor(  private route: ActivatedRoute,) { }

  ngOnInit(): void {
    debugger;
    try {
      const status = this.route.snapshot.paramMap.get('status');
      this.status = JSON.parse(status);

    } catch (error) {
      console.info(error);
    }
  }

}
