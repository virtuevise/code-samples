import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
   let Route = window.location.href.split("/")
   let tempRout = Route[3];
   if (localStorage.getItem("islogedin")!= undefined) {
     return true
   }else{
   if (tempRout !== "addCreditCard") {  
     if (sessionStorage.getItem("SessionData")) {
    return true;       
     }else{
       return false;
     }  
  }else{
    
    if (sessionStorage.getItem("SessionData")!= undefined) {
     let logeddata = sessionStorage.getItem("SessionData");
    localStorage.setItem("islogedin",logeddata);
    return true;
    }else{
    return false;
   }
  }
  }
 }
}
