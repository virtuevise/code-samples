import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  private isHiddenBack = new Subject<boolean>();
  private isHiddenAvatar = new Subject<boolean>();

  constructor() { }

  sendChangeRoute(hidden: boolean) {
    this.isHiddenBack.next(hidden);
  }

  getChangeRoute(): Observable<any> {
    return this.isHiddenBack.asObservable();
  }

  sendAvatarState(hidden: boolean) {
    this.isHiddenAvatar.next(hidden);
  }

  getAvatarState(): Observable<any> {
    return this.isHiddenAvatar.asObservable();
  }
  
}
