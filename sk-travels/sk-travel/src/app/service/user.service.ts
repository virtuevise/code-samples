import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { user_api_routes } from '../shared/constant enum\'s/routes.enum';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor
  (
    private http: HttpClient
  ) { }

  filteredDataSubject = new BehaviorSubject<any>('');
  receiveFilteredData(filteredData: any) {
    this.filteredDataSubject.next(filteredData);
  }

  // post method searching flights
  searchFlights(data: any): Observable<any> {
    return this.http.post<any>(`${user_api_routes.SEARCH_FLIGHTS}`, data);
  }

  // post method book now
  bookNow(data: any): Observable<any> {
    return this.http.post<any>(`${user_api_routes}`, data)
  }

}

