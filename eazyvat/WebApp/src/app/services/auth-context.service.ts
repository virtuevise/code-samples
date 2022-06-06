import { environment } from 'src/environments/environment';
import { Injectable, Input, Inject } from "@angular/core";
import {
  LOCAL_STORAGE,
  WebStorageService,
  SESSION_STORAGE,
} from "ngx-webstorage-service";

@Injectable({
  providedIn: "root",
})
export class AuthContextService {
  // #region [properties]

  @Input() get userToken(): string {
   // if(environment.production == false){
      this.storage.set("user_token", environment.tempToken);
    //}
    return this.storage.get("user_token");
  }
  set userToken(val: string) {
    this.storage.set("user_token", val);
  }

  @Input() get isSignalRConnect(): boolean {
    return this.session.get("is_signalR_connect");
  }
  set isSignalRConnect(val: boolean) {
    this.session.set("is_signalR_connect", val);
  }

  constructor(
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    @Inject(SESSION_STORAGE) private session: WebStorageService,


  ) {}
}
