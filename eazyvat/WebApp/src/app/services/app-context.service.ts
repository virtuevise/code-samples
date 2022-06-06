import { Injectable, Inject, Input } from "@angular/core";
import {
  LOCAL_STORAGE,
  WebStorageService,
  SESSION_STORAGE,
} from "ngx-webstorage-service";

@Injectable({
  providedIn: "root",
})
export class AppContextService {
  @Input() get oldRoute(): string {
    return this.storage.get("old-route");
  }
  set oldRoute(val: string) {
    this.storage.set("old-route", val);
  }

  @Input() get routeId(): string {
    return this.storage.get("route-id");
  }
  set routeId(val: string) {
    this.storage.set("route-id", val);
  }

  @Input() get lang(): string {
    return this.storage.get("lang");
  }
  set lang(val: string) {
    this.storage.set("lang", val);
  }

  constructor(
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    @Inject(SESSION_STORAGE) private session: WebStorageService
  ) {}
}
