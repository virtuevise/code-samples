import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AdminService } from 'src/app/service/admin.service';
import { dialogMessage } from 'src/app/shared/constant enum\'s/message.enum';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.scss']
})
export class FlightComponent implements OnInit {
  deleteDialogMessage = 'showDeleteDialog'
  flightForm: FormGroup = this.fb.group({})
  time = { hour: 13, minute: 30 };
  meridian = true;
  am_pm: string = '';
  flights: any;
  modalRef?: BsModalRef;
  locationForm: FormGroup = this.fb.group({})
  editUser: any = {};
  index: any;
  isEdit: boolean = false;
  id: any;
  delID: any;
  Location: any;
  FlightNameCode: any;
  getflightName: any;
  daysList: any = [];
  selectedItems: any = [];
  dropdownSettings: IDropdownSettings = {};
  flightCode: any = [];
  showAirlinePNR: boolean = false;
  message: any;
  temp: any = [];
  RoleModule:any;
  addPermission: boolean = false;
  editPermission: boolean = false;
  deletePermission: boolean = false;
  constructor
    (
      private service: AdminService,
      private modalService: BsModalService,
      private fb: FormBuilder,
  ) {
    this.initForm();
    this.getFlightNameCode();
    this.getLocationFrom_To();
    this.getRoleModule();
  }

  ngOnInit(): void {
    this.daysList = [
      { item_id: 1, item_text: 'monday' },
      { item_id: 2, item_text: 'tuesday' },
      { item_id: 3, item_text: 'wednesday' },
      { item_id: 4, item_text: 'thursday' },
      { item_id: 5, item_text: 'friday' },
      { item_id: 6, item_text: 'saturday' },
      { item_id: 7, item_text: 'sunday' }
    ];
    this.selectedItems = [
      { item_id: 1, item_text: 'monday' }
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  onItemSelect(item: any) {
  }

  onSelectAll(items: any) {
  }

  initForm() {
    this.getAllFlights();
    this.flightForm = this.fb.group({
      'flightid': ['', Validators.required],
      'location_from': ['', Validators.required],
      'LocationFromCode': [''],
      'location_to': ['', Validators.required],
      'LocationToCodeId': [''],
      'ValidTillDate': ['', Validators.required],
      'ValidTillTime': ['', Validators.required],
      'TotalSeat': ['', Validators.required],
      'AvailableSeat': ['', Validators.required],
      'RealTimeBooking': [false],
      'PnrNo': [''],
      'DepartureTime': ['', Validators.required],
      'ArrivalTime': ['', [Validators.required]],
      'WeekDays': ['', Validators.required],
      'FlightCode': ['', Validators.required],
    })
  }

  getFlightNameCode() {
    this.service.getFlightNameCode().subscribe((res: any) => {
      this.FlightNameCode = res.data;
    })
  }

  getLocationFrom_To() {
    this.service.getLocation().subscribe((res: any) => {
      this.Location = res.data
    })
  }

  getAllFlights() {
    this.service.getFlights().subscribe((res: any) => {
      this.flights = res.data;
    });
  }

  getRoleModule() {
    this.service.getRoleModule().subscribe((res: any) => {
      res.data.forEach((allModule:any) => {
        if (allModule.roleName) {
          let modules = allModule.modules.split(",");
          modules.forEach((element: any) => {
            switch (element) {
              case "add-flight-map":
                this.addPermission = true;
                break;
    
              case "update-flight-map":
                this.editPermission = true;
                break;
    
              case "delete-flight-map":
                this.deletePermission = true;
                break;
              default:
                break;
            }
    
          });
        }
      });
    })
  }

  nameCodeMap() {
    this.flightCode = [];
    this.FlightNameCode.filter((temp: any) => {
      if (temp.flightId == this.flightForm.value.flightid) {
        let code = temp.flightCode.split(",");
        code.forEach((element: any) => {
          this.flightCode.push(element);
        });
      }
    })
  }

  onCheckboxChange(e: any) {
    if (e.target.checked) {
      if (this.flightForm.value.RealTimeBooking == true) {
        this.showAirlinePNR = true;
        this.flightForm.get('PnrNo')?.addValidators(Validators.required);
      }
    } else {
      this.showAirlinePNR = false;
      this.flightForm.get('PnrNo')?.clearValidators();
    }
    this.flightForm.controls['PnrNo'].updateValueAndValidity();
  }

  addFlight() {
    this.flightForm.markAllAsTouched();
    if (this.flightForm.valid) {
      let temp: any = [];
      this.selectedItems.forEach((element: any) => {
        temp.push(element.item_text);
      });
      this.flightForm.value.WeekDays = temp.toString();
      let data = this.flightForm.value
      let seatDifference = data.TotalSeat >= data.AvailableSeat
      let Newdata = {};
      if (seatDifference) {
        Newdata = {
          Flightid: this.flightForm.value.flightid,
          LocationFromId: this.flightForm.value.location_from.id,
          LocationFromCode: this.flightForm.value.location_from.code,
          LocationToId: this.flightForm.value.location_to.id,
          LocationToCodeId: this.flightForm.value.location_to.code,
          ValidTillDate: this.flightForm.value.ValidTillDate,
          ValidTillTime: this.flightForm.value.ValidTillTime,
          TotalSeat: this.flightForm.value.TotalSeat,
          AvailableSeat: this.flightForm.value.AvailableSeat,
          RealTimeBooking: this.flightForm.value.RealTimeBooking == null ? false : true,
          PnrNo: this.flightForm.value.PnrNo == null ? "null" : this.flightForm.value.PnrNo,
          DepartureTime: this.flightForm.value.DepartureTime,
          ArrivalTime: this.flightForm.value.ArrivalTime,
          WeekDays: this.flightForm.value.WeekDays,
          FlightMapId: this.editUser.flightMapId,
          FlightCode: this.flightForm.value.FlightCode
        }
        if (seatDifference == true && this.flightForm.value.location_from.id ||
          this.flightForm.value.location_from.code ||
          this.flightForm.value.location_to.id ||
          this.flightForm.value.location_to.code === undefined) {
          Swal.fire({
            icon: <any>dialogMessage.DIALOG_ICON.ERROR,
            text: 'please enter again location from and location to',
            showConfirmButton: false,
            timer: 1500
          })
        }
      }
      else {
        Swal.fire({
          icon: <any>dialogMessage.DIALOG_ICON.ERROR,
          text: 'Available seats cannot be greated then total seats',
          showConfirmButton: false,
          timer: 1500
        })
      }
      if (this.isEdit == true) {
        this.service.updateFlight(Newdata).subscribe((res: any) => {
          if (res.statusCode == 200) {
            this.getAllFlights();
            this.modalRef?.hide();
            this.isEdit = false
            this.editUser = {}
            Swal.fire({
              icon: <any>dialogMessage.DIALOG_ICON.SUCCESS,
              text: dialogMessage.ADMIN_DIALOG_MESSAGE.FLIGHT_UPDATED,
              showConfirmButton: false,
              timer: 1500
            })
          } else {
            Swal.fire({
              icon: <any>dialogMessage.DIALOG_ICON.ERROR,
              text: res.message,
              showConfirmButton: false,
              timer: 1500
            })
          }
        })
      } else {
        this.service.addFlight(Newdata).subscribe((res: any) => {
          if (res.statusCode == 200) {
            this.getAllFlights();
            this.modalRef?.hide();
            this.isEdit = false
            Swal.fire({
              icon: <any>dialogMessage.DIALOG_ICON.SUCCESS,
              text: dialogMessage.ADMIN_DIALOG_MESSAGE.FLIGHT_ADDED,
              showConfirmButton: false,
              timer: 1500
            })
          } else {
            Swal.fire({
              icon: <any>dialogMessage.DIALOG_ICON.ERROR,
              text: res.message,
              showConfirmButton: false,
              timer: 1500
            })
          }
        });
      }
    }
  }

  deleteFlightById(id: any) {
    Swal.fire({
      title: dialogMessage.DELETE_DIALOG_MESSAGE.TITLE,
      text: dialogMessage.DELETE_DIALOG_MESSAGE.TEXT,
      icon: <any>dialogMessage.DIALOG_ICON.WARNING,
      allowEscapeKey: false,
      showCancelButton: true,
      allowOutsideClick: false,
      confirmButtonColor: dialogMessage.DIALOG_BUTTON_COLOR.COLOR,
      confirmButtonText: dialogMessage.DIALOG_BUTTON.CONFIRM,
      cancelButtonText: dialogMessage.DIALOG_BUTTON.CANCEL,
    }).then((result) => {
      if (result.isConfirmed) {
        this.flights.forEach((element: any, elIndex: any) => {
          if (elIndex == id) {
            id = element.flightMapId;
          }
        });
        this.service.deleteFlightById(id).subscribe((res: any) => {
          if (res.statusCode == 200) {
            Swal.fire({
              icon: <any>dialogMessage.DIALOG_ICON.SUCCESS,
              text: dialogMessage.DELETE_RESPONE_MESSAGE.OK,
              showConfirmButton: false,
              timer: 1500
            })
            this.getAllFlights();
          } else {
            Swal.fire({
              icon: <any>dialogMessage.DIALOG_ICON.ERROR,
              text: res.message,
              showConfirmButton: false,
              timer: 1500
            })
          }
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          icon: <any>dialogMessage.DIALOG_ICON.ERROR,
          text: dialogMessage.DELETE_RESPONE_MESSAGE.ERROR,
          showConfirmButton: false,
          timer: 1500
        })
      }
    })
  }

  openModal(template: TemplateRef<any>, index: any) {
    this.getLocationFrom_To();
    if (index != null) {
      this.flights.forEach((element: any, elIndex: any) => {
        if (elIndex == index) {
          this.editUser = element;
          this.isEdit = true;
          this.id = this.editUser.flightMapId
        }
      });
      if (this.editUser.weekDays != null) {
        this.temp = [];
        let tempWeekDaysName = this.editUser.weekDays
        let codeArr = tempWeekDaysName.split(',')
        codeArr.map((val: any) => {
          this.temp.push({ item_id: 1, item_text: val })
        })
        const result = this.temp.filter((thing: { item_text: any; }, index: any, self: any[]) =>
          index === self.findIndex((t) => (
            t.item_text === thing.item_text
          ))
        )
        this.temp = result
        this.selectedItems = this.temp;
      }
      this.flightForm = this.fb.group({
        flightid: [this.editUser.flightid],
        location_from: [this.editUser.flightFrom],
        location_to: [this.editUser.flightTo],
        ValidTillDate: [this.editUser.vailidTillDate],
        ValidTillTime: [this.editUser.vailidTillTime],
        TotalSeat: [this.editUser.totalSeat],
        AvailableSeat: [this.editUser.availableSeat],
        RealTimeBooking: [this.editUser.realTimeBooking],
        PnrNo: [this.editUser.pnrNo],
        DepartureTime: [this.editUser.departureTime],
        ArrivalTime: [this.editUser.arrivalTime],
        WeekDays: [this.temp],
        FlightCode: [this.editUser.flightCode],
      });
      if (this.editUser.pnrNo != null) {
        this.showAirlinePNR = true;
      }
    }
    else if (index == null) {
      this.showAirlinePNR = false;
      this.flightForm.reset();
      this.ngOnInit();
    }
    this.modalRef = this.modalService.show(template, {
      keyboard: false,
      backdrop: 'static'
    })
    this.modalRef.setClass('flight-modal-custom-style');
  }

}


