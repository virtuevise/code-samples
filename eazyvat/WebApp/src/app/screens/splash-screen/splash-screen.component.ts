import { animate, animateChild, query, style, transition, trigger } from '@angular/animations';
import { ApplicationRef, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.scss'],
   animations: [
    // the fade-in/fade-out animation.
    trigger('fadeOut', [
        transition(':leave', [
            query(':leave', animateChild(), {optional: true}),
            animate(2000, style({opacity: 0}))
        ]),
    ]),]
})
export class SplashScreenComponent implements OnInit,OnDestroy {

  show = true;

  constructor(
      private router: Router,
      // private pwaServie: PwaService,
      private cdr: ChangeDetectorRef,
      private appRef: ApplicationRef,
      // private authCtx: AuthContextService
  ) {
  }

  ngOnInit() {

    setTimeout(()=>{
      this.show = false;
      this.router.navigate(['/home']);
    },3000);

      // this.pwaService.checkForUpdate()
      //     .subscribe(result => {
      //         this.show = result;
      //         this.cdr.detectChanges();
      //         // if (this.authCtx.userToken) {
      //         //   this.router.navigate(['purchase-summary']);
      //         // } else {
      //         //   this.router.navigate(['scan']);
      //         // }

      //     });
  }

  ngOnDestroy(): void {
    this.cdr.detach();
  }

}
