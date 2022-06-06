import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AdminService } from 'src/app/service/admin.service';
import { dialogMessage } from 'src/app/shared/constant enum\'s/message.enum';
import Swal from 'sweetalert2';

export interface AutoCompleteModel {
  value: any;
  display: string;
}

@Component({
  selector: 'app-flight-info-details',
  templateUrl: './flight-info-details.component.html',
  styleUrls: ['./flight-info-details.component.scss']
})
export class FlightInfoDetailsComponent implements OnInit {
  deleteDialogMessage = 'showDeleteDialog'
  detailsForm: FormGroup = this.fb.group({});;
  modalRef?: BsModalRef;
  allDetails: any;
  editDetails: any;
  isEdit: boolean = false;
  flights: any;
  message: any;
  RoleModule:any;
  addPermission: boolean = false;
  editPermission: boolean = false;
  deletePermission: boolean = false;
  public items = [];

  constructor(
    private service: AdminService,
    private modalService: BsModalService,
    private fb: FormBuilder,
  ) {
    this.initForm();
  }

  ngOnInit(): void {

  }

  initForm() {
    this.detailsForm = this.fb.group({
      Flight_Name: ['', Validators.required],
      Flight_Code: ['', Validators.required],
      Flight_Type: [''],
      FlightNameId: ['0'],
      flightDetailsId: ['0']
    });
    this.getDetails();
    this.getFlightName();
    this.getRoleModule();
  }

  getFlightName() {
    this.service.getFlightNames().subscribe((res: any) => {
      this.flights = res.data;
    })
  }

  getDetails() {
    this.service.get_flight_name_details().subscribe((res: any) => {
      this.allDetails = res.data;
    });
  }

  getRoleModule() {
    this.service.getRoleModule().subscribe((res: any) => {
      this.RoleModule = res.data
      res.data.forEach((allModule:any) => {
        if (allModule.roleName) {
          let modules = allModule.modules.split(",");
          modules.forEach((element: any) => {
            switch (element) {
              case "add-flight-info-details":
                this.addPermission = true;
                break;
    
              case "update-flight-info-details":
                this.editPermission = true;
                break;
    
              case "delete-flight-info-details":
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

  addDetails() {
    this.detailsForm.markAllAsTouched();
    if (this.detailsForm.valid) {
      if (this.isEdit == false) {
        this.flights.forEach((element: any) => {
          if (element.flight_name == this.detailsForm.value.Flight_Name) {
            this.detailsForm.value.FlightNameId = element.id;
          }
        });
        delete this.detailsForm.value.flightDetailsId
        delete this.detailsForm.value.flightNameId
        this.service.addFlightDetails(this.detailsForm.value).subscribe((res: any) => {
          if (res.statusCode == 200) {
            this.getDetails();
            this.modalRef?.hide();
            Swal.fire({
              icon: <any>dialogMessage.DIALOG_ICON.SUCCESS,
              text: dialogMessage.ADMIN_DIALOG_MESSAGE.FLIGHT_DETAILS_ADDED,
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
      } else {
        this.service.updateFlightDetails(this.detailsForm.value).subscribe((res: any) => {
          this.getDetails();
          if (res.statusCode == 200) {
            this.isEdit = false;
            this.modalRef?.hide();
            Swal.fire({
              icon: <any>dialogMessage.DIALOG_ICON.SUCCESS,
              text: dialogMessage.ADMIN_DIALOG_MESSAGE.FLIGHT_DETAILS_UPDATED,
              showConfirmButton: false,
              timer: 1500
            })
          } else {
            this.isEdit = false;
            this.modalRef?.hide();
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

  deleteDetails(index: any) {
    Swal.fire({
      title: dialogMessage.DELETE_DIALOG_MESSAGE.TITLE,
      text: dialogMessage.DELETE_DIALOG_MESSAGE.TEXT,
      icon: <any>dialogMessage.DIALOG_ICON.WARNING,
      allowEscapeKey : false,
      showCancelButton: true,
      allowOutsideClick: false,
      confirmButtonColor: dialogMessage.DIALOG_BUTTON_COLOR.COLOR,
      confirmButtonText: dialogMessage.DIALOG_BUTTON.CONFIRM,
      cancelButtonText: dialogMessage.DIALOG_BUTTON.CANCEL,
    }).then((result) => {
      if (result.isConfirmed) {
        this.allDetails.forEach((element: any, elIndex: any) => {
          if (elIndex == index) {
            index = element;
          }
        });
        this.service.deleteFlightDetails(index.flightId).subscribe((res: any) => {
          if (res.statusCode == 200) {
            Swal.fire({
              icon: <any>dialogMessage.DIALOG_ICON.SUCCESS,
              text: dialogMessage.DELETE_RESPONE_MESSAGE.OK,
              showConfirmButton: false,
              timer: 1500
            })
            this.getDetails();
          } else {
            Swal.fire({
              icon: <any>dialogMessage.DIALOG_ICON.ERROR,
              text: res.message,
              showConfirmButton: false,
              timer: 1500
            })
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          icon:<any>dialogMessage.DIALOG_ICON.ERROR,
          text: dialogMessage.DELETE_RESPONE_MESSAGE.ERROR,
          showConfirmButton: false,
          timer: 1500
        })
      }
    })
  }

  openModal(template: TemplateRef<any>, index: any) {
    this.getFlightName();
    if (index != null) {
      this.allDetails.forEach((element: any, elIndex: any) => {
        if (elIndex == index) {
          this.editDetails = element;
          this.isEdit = true;
        }
      });
      let temp: any = [];
      let tempFlightCodes = this.allDetails[index].flightCode;
      let codeArr = tempFlightCodes.split(',')
      codeArr.map((val: any) => {
        temp.push({ id: val, value: val })
      })
      this.detailsForm = this.fb.group({
        flightNameId: [this.editDetails.flightId],
        Flight_Name: [this.editDetails.flightName, Validators.required],
        Flight_Code: [temp, Validators.required],
        Flight_Type: [this.editDetails.flightType],
      });
    }
    if (index == null) {
      this.detailsForm.reset();
    }
    this.modalRef = this.modalService.show(template, {
      keyboard: false,
      backdrop: 'static'
    })
  }

}
