import { Component,Input, OnInit } from '@angular/core';
import { HomenavControlService } from 'src/app/services/homenav-control.service';


@Component({
  selector: 'app-welcome-to-eazyvat',
  templateUrl: './welcome-to-eazyvat.component.html',
  styleUrls: ['./welcome-to-eazyvat.component.scss']
})
export class WelcomeToEazyvatComponent implements OnInit {
  status: boolean= false;

  constructor(public user:HomenavControlService) { }

  ngOnInit() {
    sessionStorage.clear();
  
    this.user.isShowIconHomeBold= false;
    this.user.isShowIconPurBold = true;
    this.user.isShowIconShopBold = false;
    this.user.isShowIconProBold = false;
  }
  
}
