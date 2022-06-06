import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AdminService } from 'src/app/service/admin.service';
import { dialogMessage } from 'src/app/shared/constant enum\'s/message.enum';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {
  deleteDialogMessage = 'showDeleteDialog'
  users: any;
  modalRef?: BsModalRef;
  locationForm: FormGroup = this.fb.group({})
  editUser: any = {};
  index: any;
  isEdit: boolean = false;
  id: any;
  delID: any;
  message: any;
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
    this.getLocation();
    this.getRoleModule();
  }

  ngOnInit(): void {

  }

  initForm() {
    this.locationForm = this.fb.group({
      'Name': ['', [Validators.required, Validators.maxLength(100)]],
      'Code': ['', [Validators.required, Validators.maxLength(10)]]
    })
  }

  getLocation() {
    this.service.getLocation().subscribe((res: any) => {
      this.users = res.data
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
              case "add-locations":
                this.addPermission = true;
                break;
    
              case "update-locations":
                this.editPermission = true;
                break;
    
              case "delete-locations":
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

  addLocation() {
    this.locationForm.markAllAsTouched();
    if (this.locationForm.valid) {
      if (this.isEdit == true) {
        let data = this.locationForm.value;
        this.id;
        this.service.editLocation(data, this.id).subscribe((res: any) => {
          if (res.statusCode == 200) {
            this.getLocation();
            this.modalRef?.hide();
            this.isEdit = false;
            Swal.fire({
              icon: <any>dialogMessage.DIALOG_ICON.SUCCESS,
              text: dialogMessage.ADMIN_DIALOG_MESSAGE.LOCATION_UPDATED,
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
        let data = this.locationForm.value
        this.service.addLocation(data).subscribe((res: any) => {
          if (res.statusCode == 200) {
            this.getLocation();
            this.modalRef?.hide();
            Swal.fire({
              icon: <any>dialogMessage.DIALOG_ICON.SUCCESS,
              text: dialogMessage.ADMIN_DIALOG_MESSAGE.LOCATION_ADDED,
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

  deleteLocationById(id: any) {
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
        this.delID = id
        this.service.deleteLocation(this.delID).subscribe((res: any) => {
          if (res.statusCode == 200) {
            Swal.fire({
              icon: <any>dialogMessage.DIALOG_ICON.SUCCESS,
              text: dialogMessage.DELETE_RESPONE_MESSAGE.OK,
              showConfirmButton: false,
              timer: 1500
            })
            this.getLocation();
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
          icon: <any>dialogMessage.DIALOG_ICON.ERROR,
          text: dialogMessage.DELETE_RESPONE_MESSAGE.ERROR,
          showConfirmButton: false,
          timer: 1500
        })
      }
    })
  }

  openModal(template: TemplateRef<any>, index: any) {
    if (index != null) {
      this.users.forEach((element: any, elIndex: any) => {
        if (elIndex == index) {
          this.editUser = element;
          this.isEdit = true;
          this.id = this.editUser.id
        }
        this.locationForm = this.fb.group({
          Name: [this.editUser.name, Validators.required],
          Code: [this.editUser.code, Validators.required],
        });
      });
    }
    if (index == null) {
      this.locationForm.reset();
    }
    this.modalRef = this.modalService.show(template, {
      keyboard: false,
      backdrop: 'static'
    })
  }
}
