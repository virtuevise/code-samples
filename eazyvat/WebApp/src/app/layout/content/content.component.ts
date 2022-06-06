import { Component, OnInit } from '@angular/core';
import { HomenavControlService } from 'src/app/services/homenav-control.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  constructor(public user:HomenavControlService) { }

  ngOnInit(): void {
  }

}
