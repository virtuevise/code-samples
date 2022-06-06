import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';
import { UserService } from 'src/app/service/user.service';
import { dialogMessage } from 'src/app/shared/constant enum\'s/message.enum';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {
  flights: any;
  FlightNameCode: any;
  getLocations: any;
  getLocationsInReverse: any;
  flightNameDetails: any;
  showFlightList: boolean = false;
  userForm!: FormGroup;
  filteredData!:any;
  tableDate: any;
  constructor
    (
      private userService: UserService,
      private adminService: AdminService,
      private fb: FormBuilder,
      private router: Router,
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getLocation();
    this.getFlightNameCode();
  }

  initForm() {
    this.userForm = this.fb.group({
      LocationFrom: ['',Validators.required],
      LocationTo: ['',Validators.required],
      TravelDate: ['',Validators.required],
      Adults: ['',Validators.required],
      Airline: ['',Validators.required]
    })
  }

  getLocation() {
    this.adminService.getLocation().subscribe((res: any) => {
      this.getLocations = res.data
    });
  }

  getFlightNameCode() {
    this.adminService.getFlightNameCode().subscribe((res: any) => {
      this.FlightNameCode = res.data;
    })
  }
  
  sendFilteredData(filteredData: any) {
    this.userService.receiveFilteredData(this.filteredData)
  }

  onBookNow() {
    this.router.navigateByUrl('/user/book-now')
    this.sendFilteredData(this.filteredData);
  }

  onSearch() {
    this.userForm.markAllAsTouched();
    if (this.userForm.valid) {
      let data = this.userForm.value;
      this.userService.searchFlights(data).subscribe((res: any) => {
        if (res.statusCode == 200) {
          this.filteredData = res.data  
          let count = this.filteredData.length
          this.tableDate = this.filteredData[0].validTillDate
          this.showFlightList = true;
          Swal.fire({
            icon: <any>dialogMessage.DIALOG_ICON.SUCCESS,
            text: count + ' ' + dialogMessage.USER_DIALOG_MESSAGE.FOUNDED_RECORD,
            showConfirmButton: false,
            timer: 1500
          })
        } else {
          this.showFlightList = false;
          Swal.fire({
            icon: <any>dialogMessage.DIALOG_ICON.ERROR,
            text: res.message,
            showConfirmButton: false,
            timer: 1500
          })
        }
      })
    }
  }
}
