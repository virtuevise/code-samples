import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { TokenResponse } from "../model/token-response.model";
import { PassportDetails } from "../model/passport-details.model";
import { AccountProfile } from "../model/account-profile.model";
import { ConfigurationService } from '../core/services/configuration.service';
import { BaseService } from '../core/services/base.service';
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import jwt_decode from "jwt-decode";
// tt
@Injectable({
  providedIn: "root",
})
export class AccountService extends BaseService {
  public readonly baseApiUrl: string = `${environment.endPointApiSupplier}/Accounts/`;
  
  passportData:any=[];
  passportId:string;
  constructor(private http: HttpClient, private configService: ConfigurationService) {
    super('AccountService');
  }

  scanPassport(passport): Promise<TokenResponse> {
    debugger  
    console.log(this.configService.getApiUrl.call(this) + "/scan");
    return this.http.post(this.configService.getApiUrl.call(this) + "/scan", passport).toPromise<any>();
    // return this.http.post("http://localhost:51632/Account/scan", passport).toPromise<any>();
  }

  
  getAccountProfile(memberId): Observable<any> {
    return this.http.get<any>(this.baseApiUrl + "GetAccountDetailById?memberId=" + memberId);
  }

  saveUserDetails(details): Observable<any> {
    return this.http.post<any>(this.baseApiUrl + "saveUserDetails", details);
  }

  getCountryForForm():Observable<any>{
    return this.http.get<any>(this.baseApiUrl+"getCountryForForm");
  }
  
  JwtDecoder(key:string){
    debugger
    let decoded = JSON.parse(window.atob(key.split('.')[1]));
    let memberId = decoded.ClaimId;
    return memberId;
  }
}
