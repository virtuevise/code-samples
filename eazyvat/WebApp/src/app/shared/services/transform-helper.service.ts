import {
    IScanResult
  } from './../model/scan-response.model';
  import {
    Injectable
  } from '@angular/core';
  import { PassportDetails } from 'src/app/model/passport-details.model';
  
  
  @Injectable({
    providedIn: 'root'
  })
  export class TransformHelperService {
  
    constructor() {}
  
    scanToPassport = (scan: IScanResult): PassportDetails => {
      // tslint:disable-next-line:max-line-length
      const expiredDate = this.stringToDate(scan.formattedDateOfExpiry);
  
      const birthDate = this.stringToDate(scan.formattedDateOfBirth);
  
      // tslint:disable-next-line:max-line-length
      const passport = new PassportDetails(scan.givenNames, scan.surname, scan.nationalityCountryCode, scan.documentNumber, expiredDate, birthDate);
  
      return passport;
    }
  
    stringToDate(ddmmyyyy: string): Date {
  
        const dateArr = ddmmyyyy.split('.');
  
        // tslint:disable-next-line:radix
        const result = new Date( parseInt(dateArr[2]), parseInt(dateArr[1]) - 1, parseInt(dateArr[0]), 6, 0);
  
        return result;
  
    }
  }
  