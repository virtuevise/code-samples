import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {SharedModule} from '../shared/shared.module'
import {AdminRoutingModule} from './admin-routing.module';
import { AllUsersComponent } from './all-users/all-users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocationComponent } from './location/location.component';
import { FlightComponent } from './flight/flight.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown'
import { FlightInfoDetailsComponent } from './flight-info-details/flight-info-details.component';
import { TagInputModule } from 'ngx-chips';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { AddRolesComponent } from './add-roles/add-roles.component';

@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    AllUsersComponent,
    LocationComponent,
    FlightComponent,
    FlightInfoDetailsComponent,
    AddRolesComponent
  ],
  imports: [
    CommonModule, 
    AdminRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    TagInputModule,
    NgxMaterialTimepickerModule,
    NgMultiSelectDropDownModule.forRoot(),
  ],
})
export class AdminModule { }
