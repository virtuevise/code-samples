import { Visit } from './../model/trip-details.model';
import { Shop } from 'src/app/model/shop.model';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PersonalDetails } from '../model/member-details.model';
import { PassportDetails } from '../model/passport-details.model';
import { BaseService } from '../core/services/base.service';
import { ConfigurationService } from '../core/services/configuration.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MemberService extends BaseService {
  public readonly baseApiUrl: string = `${environment.endPointApiSupplier}/Accounts/`;

  constructor(private http: HttpClient, private configService: ConfigurationService) {
    super('MemberService');
  }

  updatePersonalDetails(data): Observable<any> {
    return this.http.post<any>(this.baseApiUrl + "updatePersonalDetails", data);
  }

  updateVisitDetails(model: Visit): Promise<any> {
    return this.http.post(this.configService.getApiUrl.call(this) + '/visit', model).toPromise<any>();
    // return this.http.post(`http://localhost:51632/Member/visit`,model).toPromise<any>();
  }

  getVisitDetails(): Observable<any> {
    return this.http.get(this.baseApiUrl + 'getVisitInfo');
  }

  getPersonalDetails(memberId): Observable<any> {
    return this.http.get<any>(this.baseApiUrl + "GetPersonalDetailById?memberId=" + memberId);
  }

  getPassportDetails(id): Promise<PassportDetails> {
    return this.http.get(this.configService.getApiUrl.call(this) + '/passport/'+id).toPromise<any>();
  }

  getShopsVatDetails(): Observable<any> {
    return this.http.get<any>(this.baseApiUrl + 'getShopsVatInfo');
  }

  getMemberVisitInfo(memberId): Promise<any> {
    return this.http.get(this.configService.getApiUrl.call(this) + `/visit/${memberId}`).toPromise<any>();
    // return this.http.get(`http://localhost:51632/Member/visit/${memberId}`).toPromise<any>();
  }
}
