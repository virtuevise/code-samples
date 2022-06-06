import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AdminService } from 'src/app/service/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { dialogMessage } from 'src/app/shared/constant enum\'s/message.enum';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss']
})
export class AllUsersComponent implements OnInit {
  deleteDialogMessage = 'showDeleteDialog'
  users: any;
  modalRef?: BsModalRef;
  userFrom: FormGroup = this.fb.group({});
  editUserFrom: FormGroup = this.fb.group({});
  isEdit: boolean = false;
  editUser: any = {};
  showPassword = true;
  submitted: boolean = false
  roles: any;
  message: any;
  tableRole: any;
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
      this.getRoleModule();
    }

  ngOnInit(): void {

  }

  initForm() {
    this.userFrom = this.fb.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Email: ['', Validators.compose([Validators.required])],
      Contact: ['', Validators.compose([Validators.required])],
      Password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      ConfirmPassword: ['', Validators.compose([Validators.required])],
      Role: ['', Validators.required],
      Remember: false
    },
      {
        validators: this.MustMatch('Password', 'ConfirmPassword')
      });
    this.getAllUser();
    this.getAllFormRoles();
    this.getTableRoles();
  }

  get f() {
    return this.userFrom.controls;
  }

  MustMatch(password: any, ConfirmPassword: any) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const conPasswordControl = formGroup.controls[ConfirmPassword];

      if (conPasswordControl.errors && !conPasswordControl.errors['MustMatch']) {
        return;
      }
      if (passwordControl.value !== conPasswordControl.value) {
        conPasswordControl.setErrors({ MustMatch: true });
      } else {
        conPasswordControl.setErrors(null);
      }
    }
  }

  getTableRoles() {
    this.service.getRoles().subscribe((res: any) => {
      this.tableRole = res.data
    })
  }

  getAllUser() {
    this.service.getAllUser().subscribe((res: any) => {
      this.users = res.data;
    });
  }

  getAllFormRoles() {
    this.service.getAllRoles().subscribe((res: any) => {
      this.roles = res.data;
    })
  }

  getRoleModule() {
    this.service.getRoleModule().subscribe((res: any) => {
      res.data.forEach((allModule:any) => {
        if (allModule.roleName) {
          let modules = allModule.modules.split(",");
          modules.forEach((element: any) => {
            switch (element) {
              case "add-users":
                this.addPermission = true;
                break;
    
              case "update-users":
                this.editPermission = true;
                break;
    
              case "delete-users":
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

  addUsers() {
    this.userFrom.markAllAsTouched();
    if (this.userFrom.valid) {
      if (this.userFrom.value.Remember == null) {
        this.userFrom.value.Remember = false;
      }
      let data = {
        id: this.userFrom.value.id,
        FirstName: this.userFrom.value.FirstName,
        LastName: this.userFrom.value.LastName,
        Email: this.userFrom.value.Email,
        Contact: this.userFrom.value.Contact,
        Password: this.userFrom.value.Password,
        Role: this.userFrom.value.Role,
        Remember: this.userFrom.value.Remember
      }
      if (this.isEdit == false) {
        this.service.addUsers(data).subscribe((res: any) => {
          if (res.statusCode == 200) {
            this.getAllUser();
            this.modalRef?.hide();
            Swal.fire({
              icon: <any>dialogMessage.DIALOG_ICON.SUCCESS,
              text: dialogMessage.ADMIN_DIALOG_MESSAGE.USER_ADDED,
              showConfirmButton: false,
              timer: 1500
            })
          } else {
            this.isEdit = false;
            Swal.fire({
              icon: <any>dialogMessage.DIALOG_ICON.ERROR,
              text: res.message,
              showConfirmButton: false,
              timer: 1500
            })
          }
        });
      } else {
        this.service.editUser(data).subscribe((res: any) => {
          if (res.statusCode == 200) {
            this.getAllUser();
            this.modalRef?.hide();
            this.isEdit = false;
            Swal.fire({
              icon: <any>dialogMessage.DIALOG_ICON.SUCCESS,
              text: dialogMessage.ADMIN_DIALOG_MESSAGE.USER_UPDATED,
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
      }
    }
  }

  deleteUserById(id: any) {
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
        this.users.forEach((element: any, elIndex: any) => {
          if (elIndex == id) {
            id = element.id
          }
        });
        this.service.deleteUserById(id).subscribe((res: any) => {
          if (res.statusCode == 200) {
            this.getAllUser();
            Swal.fire({
              icon: <any>dialogMessage.DIALOG_ICON.SUCCESS,
              text: dialogMessage.DELETE_RESPONE_MESSAGE.OK,
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
      this.isEdit = true;
      this.showPassword = false;
      this.users.forEach((element: any, elIndex: any) => {
        if (elIndex == index) {
          this.editUser = element
        }
      });
      delete this.userFrom.value.Password;
      this.userFrom = this.fb.group({
        id: [this.editUser.id],
        FirstName: [this.editUser.firstName, Validators.required],
        LastName: [this.editUser.lastName, Validators.required],
        Email: [this.editUser.email, Validators.required],
        Contact: [this.editUser.contact, Validators.required],
        Role: [this.editUser.role, Validators.required],
        Remember: [this.editUser.Remember]
      });
    } else {
      this.userFrom = this.fb.group({
        FirstName: ['', Validators.required],
        LastName: ['', Validators.required],
        Email: ['', Validators.compose([Validators.required])],
        Contact: ['', Validators.compose([Validators.required])],
        Password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
        ConfirmPassword: ['', Validators.compose([Validators.required])],
        Role: ['', Validators.required],
        Remember: false
      },
        {
          validators: this.MustMatch('Password', 'ConfirmPassword')
        });
      this.isEdit = false;
      this.showPassword = true;
      this.userFrom.reset();
    }
    this.modalRef = this.modalService.show(template, {
      keyboard: false,
      backdrop: 'static',
      class: 'modal-lg '
    })
    this.modalRef.setClass('user-modal-custom-style');
  }
}
