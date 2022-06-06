import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { admin_api_routes } from '../shared/constant enum\'s/routes.enum';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  // ADD ROLES

  getAllRoles(): Observable<any> {
    return this.http.get(`${admin_api_routes.GET_ALL_ROLES}`);
  }

  getAllModule() {
    return this.http.get(`${admin_api_routes.GET_ALL_MODULE}`);
  }

  getRoleModule() {
    return this.http.get(`${admin_api_routes.GET_ROLE_MODULE}`);
  }

  addRoles(data: any): Observable<any> {
    return this.http.post(`${admin_api_routes.ADD_ROLE}`, data);
  }

  deleteRoleById(id: any): Observable<any> {
    return this.http.delete(`${admin_api_routes.DELETE_ROLE_BY_ID}/${id}`);
  }

  updateRole(data: any): Observable<any> {
    return this.http.post(`${admin_api_routes.UPDATE_ROLE}`, data)
  }

  // USER

  getRoles(): Observable<any> {
    return this.http.get(`${admin_api_routes.GET_ALL_ROLES}`)
  }

  getAllUser(): Observable<any> {
    return this.http.get(`${admin_api_routes.GET_ALL_USERS}`);
  }

  addUsers(data: any): Observable<any> {
    return this.http.post(`${admin_api_routes.ADD_USER}`, data);
  }

  //EDIT
  editUser(data: any): Observable<any> {
    return this.http.post(`${admin_api_routes.UPDATE_USER}`, data)
  }

  deleteUserById(id: any): Observable<any> {
    return this.http.delete(`${admin_api_routes.DELETE_USER_BY_ID}/${id}`);
  }


  // LOCATION

  // post
  addLocation(data: any): Observable<any> {
    return this.http.post(`${admin_api_routes.ADD_LOCATION}`, data);
  }

  // get
  getLocation(): Observable<any> {
    return this.http.get(`${admin_api_routes.GET_LOCATION}`);
  }

  // delete
  deleteLocation(delID: any): Observable<any> {
    return this.http.delete(`${admin_api_routes.DELETE_LOCATION_BY_ID}/${delID}`);
  }

  //EDIT 
  editLocation(data: any, id: any): Observable<any> {
    return this.http.post(`${admin_api_routes.UPDATE_LOCATION_BY_ID}/${id}`, data)
  }

  //Flight-info-Details

  getFlightNames(): Observable<any> {
    return this.http.get<any>(`${admin_api_routes.GET_FLIGHT_NAMES}`)
  }

  //Get Flight Details
  get_flight_name_details(): Observable<any> {
    return this.http.get(`${admin_api_routes.GET_FLIGHT_NAME_DETAILS}`);
  }

  // POST
  addFlightDetails(data: any): Observable<any> {
    return this.http.post(`${admin_api_routes.ADD_FLIGHT_DETAILS}`, data);
  }

  //POST
  updateFlightDetails(data: any): Observable<any> {
    return this.http.post(`${admin_api_routes.UPDATE_FLIGHT_DETAILS}`, data);
  }

  //DELETE
  deleteFlightDetails(id: any): Observable<any> {
    return this.http.delete(`${admin_api_routes.DELETE_FLIGHT_DETAILS}/${id}`);
  }


  // FLIGHT   

  //get flight details 
  getFlightNameCode(): Observable<any> {
    return this.http.get<any>(`${admin_api_routes.GET_FLIGHT_NAME_DETAILS}`);
  }

  // get all map flight 
  getFlights(): Observable<any> {
    return this.http.get(`${admin_api_routes.GET_ALL_FLIGHTS}`);
  }

  // post
  addFlight(data: any): Observable<any> {
    return this.http.post(`${admin_api_routes.ADD_FLIGHTS}`, data);
  }

  // update 
  updateFlight(data: any): Observable<any> {
    return this.http.post(`${admin_api_routes.UPDATE_FLIGHT}`, data);
  }
  // delete
  deleteFlightById(id: any): Observable<any> {
    return this.http.delete(`${admin_api_routes.DELETE_FLIGHT_BY_ID}/${id}`);
  }

}
