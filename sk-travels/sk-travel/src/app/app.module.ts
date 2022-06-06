import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import {AuthModule} from './auth/auth.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { Interceptor } from './shared/interceptor/interceptor';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule,
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    NgxSpinnerModule
  ], 
  bootstrap: [AppComponent],
  providers : [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true,
    }
  ]
})
export class AppModule { }
