 import {
    Injectable
  } from '@angular/core';
  import {
    ActivatedRouteSnapshot,
    CanActivate,
    RouterStateSnapshot,
    Router,
    CanLoad,
    NavigationEnd
  } from '@angular/router';
  import {
    AccountService
  } from './account.service';
  import {
    AppContextService
  } from './app-context.service';
  import { MessagesService } from '../shared/services/messages.service';
  import { RegistrationRouteView } from '../shared/static/nav-items';
  
  @Injectable({
    providedIn: 'root'
  })
  export class RouteGuard implements CanActivate {
  
    // tslint:disable-next-line:max-line-length
    constructor(public auth: AccountService, public router: Router, private messageService: MessagesService, public appCtx: AppContextService) {
      this.subscribeNavigationEnd();
    }
  
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
  
      const urlSegments = this.router.url.split('/');
  
      if (this.router.url.indexOf('purchase-details') >= 0) {
        this.appCtx.routeId = urlSegments[2];
      } else {
        this.appCtx.routeId = undefined;
      }
  
      return true;
    }
  
    private subscribeNavigationEnd() {
  
      this.router.events.forEach((event: NavigationEnd) => {
        if (event instanceof NavigationEnd) {
          const urlSegments = event.url.split('/');
  
          const isShow = RegistrationRouteView.some(x => x.name === urlSegments[1]);
  
          this.messageService.sendChangeRoute(!isShow);
  
        }
      });
  
    }
  
  }
   