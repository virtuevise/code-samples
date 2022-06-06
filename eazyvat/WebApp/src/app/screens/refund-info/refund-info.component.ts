import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpinnerVisibilityService } from 'ng-http-loader';

@Component({
  selector: 'app-refund-info',
  templateUrl: './refund-info.component.html',
  styleUrls: ['./refund-info.component.scss']
})
export class RefundInfoComponent implements OnInit {

  constructor(private spinner: SpinnerVisibilityService,private router: Router) { }

  ngOnInit(): void {
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 3000);
  }
  goTohome() {
this.router.navigateByUrl("/home");
  }
}
