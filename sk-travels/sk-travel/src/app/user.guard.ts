import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor(private route:Router){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (localStorage.getItem("Token")) {
        if (localStorage.getItem("Role")=="user") {
          return true;
        }  else{
          this.route.navigateByUrl("/admin");
          return false;
        }
       }else{
         this.route.navigateByUrl("/LogIn");
         return false
       }
  }
  
}
