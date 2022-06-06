import { environment } from "src/environments/environment";


const auth = `${environment.baseUrl}/Account`
const admin = `${environment.baseUrl}/Admin`
const admin_location = `${environment.baseUrl}/Location`
const admin_FLIGHT = `${environment.baseUrl}/Flight`
const user = `${environment.baseUrl}/User`


export const auth_api_routes = {

    // ACCOUNT
    REGISTER: `${auth}/Register`,
    LOGIN: `${auth}/Login`,
}

export const admin_api_routes = {

    // ADD ROLES
    GET_ALL_ROLES: `${admin}/getAllRole`,
    GET_ALL_MODULE: `${admin}/getAllModule`,
    GET_ROLE_MODULE: `${admin}/getRoleModule`,
    ADD_ROLE: `${admin}/addRoleValidation`,
    DELETE_ROLE_BY_ID: `${admin}/deleteRoleValidation`,
    UPDATE_ROLE: `${admin}/updateRoleValidation`,

    // USER
    GET_ALL_USERS: `${admin}/GetAllUser`,
    ADD_USER: `${admin}/add-user`,
    UPDATE_USER: `${admin}/update-user`,
    DELETE_USER_BY_ID: `${admin}/deleteUserById`,

    // LOCATION
    ADD_LOCATION: `${admin_location}/add-locations`,
    GET_LOCATION: `${admin_location}/locations`,
    DELETE_LOCATION_BY_ID: `${admin_location}/Delete-locations`,
    UPDATE_LOCATION_BY_ID: `${admin_location}/update-locations`,

    // FLIGHT INFO DETAILS
    GET_FLIGHT_NAMES: `${admin_FLIGHT}/get_flight_name`,
    GET_FLIGHT_NAME_DETAILS: `${admin_FLIGHT}/get_flight_name_details`,
    ADD_FLIGHT_DETAILS: `${admin_FLIGHT}/add_flights_details`,
    UPDATE_FLIGHT_DETAILS: `${admin_FLIGHT}/update_flights_details`,
    DELETE_FLIGHT_DETAILS: `${admin_FLIGHT}/delete_flights_details`,

    // FLIGHT
    GET_ALL_FLIGHTS: `${admin_FLIGHT}/get_all_flights`,
    ADD_FLIGHTS: `${admin_FLIGHT}/add_flights`,
    UPDATE_FLIGHT: `${admin_FLIGHT}/update_flights`,
    DELETE_FLIGHT_BY_ID: `${admin_FLIGHT}/delete_flights`,
}

export const user_api_routes = {

    // USERS 
    SEARCH_FLIGHTS: `${user}/search_flights`
}
