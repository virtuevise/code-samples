import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class Interceptor implements HttpInterceptor {

  constructor(private spinnerSer: NgxSpinnerService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.spinnerSer.show(undefined, {
      type: 'timer',
      size: 'medium'
    });

     return next.handle(request).pipe(
           finalize(() => this.spinnerSer.hide()),
     );
  }
}

