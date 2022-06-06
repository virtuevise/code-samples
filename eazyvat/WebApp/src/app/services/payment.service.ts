import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  public readonly baseApiUrl: string = `${environment.endPointApiSupplier}/Payment/`;

  constructor(private http: HttpClient) { }

  getUserSavedCards(userId): Observable<any> {
    return this.http.get<any>(this.baseApiUrl + "GetUserSavedCards?userId=" + userId);
  }
  addUserCard(details): Observable<any> {
    return this.http.post<any>(this.baseApiUrl + "AddUserCard", details);
  }
  DeleteUserCard(details): Observable<any> {
    return this.http.post<any>(this.baseApiUrl + "DeleteUserCard" , details);
  }

}
