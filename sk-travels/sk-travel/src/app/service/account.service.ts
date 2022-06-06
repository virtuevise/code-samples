import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import jwt_decode from "jwt-decode";
import { auth_api_routes } from '../shared/constant enum\'s/routes.enum';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor
  (
    private http: HttpClient
  ) { }

    // account
    signUp(data:any):Observable<any>{ 
      return this.http.post<any>(`${auth_api_routes.REGISTER}`, data); 
    }
  
    logIn(data:any):Observable<any>{
      return this.http.post(`${auth_api_routes.LOGIN}`, data);
    }

    tokenDecoder(token: any) {
      try {
        var decodeData: any = jwt_decode(token);
        let keys = Object.keys(decodeData);
        let role = '';
        let name = '';
        keys.map(key=> {
          let str = key.split('/');
          if(str[str.length-1] == 'role') {
            role = decodeData[key];
          } else if(str[str.length-1] == 'name') {
            name = decodeData[key];
          }
        });
        var tokenData = { Role: role, Name: name }
        localStorage.setItem('decodedTokenData', JSON.stringify(tokenData));
      }
      catch (Error) {
        return token;
      }
    }
}
