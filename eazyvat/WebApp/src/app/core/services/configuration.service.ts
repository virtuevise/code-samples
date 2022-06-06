
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  public static readonly baseApiUrl: string = environment.endPointApi;

  public serviceName: string;

  constructor() {
  }

  public getApiUrl(): string {
    return ConfigurationService.baseApiUrl + '/' + this.serviceName;
  }
}
