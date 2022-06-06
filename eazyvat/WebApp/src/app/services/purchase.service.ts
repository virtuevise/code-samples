import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { PurchaseSummary } from '../model/purchase-summary.model';
import { ICurrentPurchase } from '../model/current-purchases.model';
import { PurchaseDetails } from '../model/purchase-details.model';
import { Invoice } from '../model/invoice-details.model';
import { Observable, Subject,BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

   public readonly baseApiUrl: string = `${environment.endPointApiSupplier}/Purchase`;
  //  public readonly baseapiuri:string=`${environment.endpoints}/Purchase`;
   purchaseId:string;
   purchaseCount = new Subject<any>();
   navIconInHome = new BehaviorSubject<boolean>(false);
   defaultLang=new BehaviorSubject<string>('en');
  //public readonly baseApiUrl: string =`http://localhost:49331/Purchase`;
  constructor(private http: HttpClient) { }

  getPurchase(id: string): Promise<PurchaseDetails> {

    return this.http.get(this.baseApiUrl + '/' + id).toPromise<any>();

  }

  // getPurchasesSummary(): Promise<PurchaseSummary> {

  //   return this.http.get(this.baseApiUrl + '/PurchaseSummary').toPromise<any>();

  // } 

  getPurchasesSummary(memId): Observable<any> {
    return this.http.get<any>(this.baseApiUrl + "/PurchaseSummary?memberId=" + memId);
     //return this.http.get<any>(`http://localhost:49331/Purchase/PurchaseSummary?memberId=${memId}`);
  }

   getPurchasesSummaryById(id): Observable<any> {
    return this.http.get<any>(this.baseApiUrl + "/PurchaseSummaryById?purchaseId=" + id);
    // return this.http.get<any>(`http://localhost:49331/Purchase/PurchaseSummaryById?purchaseId=${id}`);
  }

  getCurrentPurchases(): Promise<ICurrentPurchase> {
    return this.http.get(this.baseApiUrl + '/current').toPromise<any>();
  }

  getInvoiceItems(id: string): Observable<any> {
     return this.http.get<any>(this.baseApiUrl + '/invoice/' + this.purchaseId);      
  }
  getPurchaseCount(userId): Observable<Invoice> {
    return this.http.get<any>(this.baseApiUrl + '/getPurchaseCount?userId=' + userId);
  }

  getPurchaseNewCount(userId): Observable<Invoice> {
      return this.http.get<any>(this.baseApiUrl + '/getPurchaseNewCount?userId=' + userId);
    // return this.http.get<any>(`http://localhost:49331/Purchase/getPurchaseNewCount?userId=${userId}`);
  }

  resetPurchaseById(userId,purchaseId):Observable<any>{
      var param ={ 
      userId: userId ,
      purchaseId: purchaseId     
    }
    return this.http.post<any>(this.baseApiUrl + "/resetPurchase",param);
  }
}
