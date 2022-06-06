import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ScanApiService {

  constructor(private http:HttpClient) { }

  scanPassport(blob: string): Promise<any> {

    const config = {viewPlugin: {plugin: {idPlugin: {mrzConfig: {vizDateOfIssue: {scanOption: "mandatory"}}}}}};
    const body = { config , license: environment.scanLicense, blob };

    return fetch(environment.scanApi, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  }
}
