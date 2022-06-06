import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AdminService } from 'src/app/service/admin.service';
import { dialogMessage } from 'src/app/shared/constant enum\'s/message.enum';
import Swal from 'sweetalert2';

interface Modules {
  module: any;
  isSelected: boolean;
}

@Component({
  selector: 'app-add-roles',
  templateUrl: './add-roles.component.html',
  styleUrls: ['./add-roles.component.scss']
})
export class AddRolesComponent implements OnInit {
  modalRef?: BsModalRef;
  addRolesForm!: FormGroup;
  roles: any;
  editRole: any = {};
  modules: any = [];
  RoleModule: any = [];
  addPermission: boolean = false;
  editPermission: boolean = false;
  deletePermission: boolean = false;
  moduleArr: Modules[] = [];
  checked: any = [];
  isEdit: boolean = false;
  message: any;
  pushedModules: any = [];
  temp: any = [];
  checkBoxesAreChecked: boolean = false;
  isChecked: boolean = false;
  getRoleName: any;

  constructor
    (
      private service: AdminService,
      private modalService: BsModalService,
      private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getAllModule();
    this.getRoleModule();
    this.getRoles();
  }

  initForm() {
    this.addRolesForm = this.fb.group({
      RoleName: ['', Validators.required],
      Module: this.fb.array([]),
      id: ['0']
    })
  }

  getRoles() {
    this.service.getAllRoles().subscribe(res => {
      this.roles = res.data
    })
  }
  getAllModule() {
    this.service.getAllModule().subscribe((res: any) => {
      this.modules = res.data;
    })
  }

  getRoleModule() {
    this.service.getRoleModule().subscribe((res: any) => {
      this.RoleModule = res.data
      res.data.forEach((allModule: any) => {
        if (allModule.roleName) {
          let modules = allModule.modules.split(",");
          modules.forEach((element: any) => {
            switch (element) {
              case "add-roles":
                this.addPermission = true;
                break;

              case "update-roles":
                this.editPermission = true;
                break;

              case "delete-roles":
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

  onCheckboxChange(item: string, isChecked: any) {
    //ADD CHECKBOXES
    if (isChecked.checked == true && this.isEdit == false) { // ADD CHECKBOXES IN ADD NEW
      const obj = {} as Modules;
      obj.module = item;
      this.moduleArr.push(obj);
    } else if (isChecked.checked == true && this.isEdit == true) { // ADD CHECKBOXES IN EDIT
      this.moduleArr = this.temp
      const obj = {} as Modules;
      obj.module = item;
      this.moduleArr.push(obj);
    }
    else {
      if (isChecked.checked == false && this.isEdit == false) { // REMOVE CHECKBOXES IN ADD NEW
        let i: number = 0;
        this.moduleArr.forEach((element: any) => {
          if (element.module == item) {
            this.moduleArr.splice(i, 1);
            return;
          }
          i++;
        });
      }
      else if (isChecked.checked == false && this.isEdit == true) { // REMOVE CHECKBOXES IN EDIT
        let i: number = 0;
        this.temp.forEach((element: any) => {
          if (element.module == item) {
            this.temp.splice(i, 1);
            return;
          } i++;
        });
        this.moduleArr = this.temp
      }
    }
    const result = this.moduleArr.filter((thing: { module: any; }, index: any, self: any[]) =>
      index === self.findIndex((t) => (
        t.module === thing.module
      ))
    )
    this.moduleArr = result
    this.addRolesForm.value.Module = this.moduleArr
    if (this.isEdit == true) {
      if (this.addRolesForm.value.Module.length > 0) {
        this.checkBoxesAreChecked = true
        this.addRolesForm.value.RoleName = this.pushedModules.roleName
      }
      else {
        this.checkBoxesAreChecked = false
      }
    }
    else if (this.addRolesForm.value.Module.length > 0 && this.addRolesForm.value.RoleName != null) {
      this.checkBoxesAreChecked = true
    }
    else {
      this.checkBoxesAreChecked = false
    }
  }

  onSelectAll(e: any): void {
    if (e.target.checked == true) {
      this.isChecked = e.target.checked;
      var temp: any[] = [];
      var newTemp: { module: any; isSelected: boolean }[] = [];
      this.modules.map((x: any) => temp.push(x.moduleName))
      temp.map(module => newTemp.push({ module, isSelected: true }))
      this.moduleArr = newTemp
      this.addRolesForm.value.Module = this.moduleArr
      this.getRoleName = this.addRolesForm.get('RoleName')
      this.addRolesForm.value.RoleName = this.getRoleName.value
      if (this.addRolesForm.valid && this.moduleArr.length > 0) {
        this.checkBoxesAreChecked = true
      } else {
        this.checkBoxesAreChecked = false
      }
    } else {
      this.isChecked = false;
      this.moduleArr = [];
      this.checkBoxesAreChecked = false
    }
  }


  openModal(template: TemplateRef<any>, index: any) {
    this.moduleArr = [];
    if (index != null) {
      this.isEdit = true;
      this.isChecked = false;
      this.temp = [];
      this.RoleModule.forEach((element: any, elIndex: any) => {
        if (elIndex == index) {
          this.pushedModules = element;
        }
      });
      let tempModulesName = this.pushedModules.modules
      let codeArr = tempModulesName.split(',')
      codeArr.map((val: any) => {
        this.temp.push({ module: val, isSelected: true })
      })
      this.addRolesForm = this.fb.group({
        RoleName: [this.pushedModules.roleName, Validators.required],
        Module: [this.temp, Validators.required]
      });
      this.checkBoxesAreChecked = false
      this.addRolesForm.controls['RoleName'].disable()
      this.modules.map((module: any) => {
        let index = this.temp.findIndex((t: any) => t.module == module.moduleName);
        if (index !== -1) {
          module['isSelected'] = true;
        } else {
          module['isSelected'] = false;
        }
      });
    }
    if (index == null) {
      this.initForm();
      this.isChecked = false;
      this.isEdit = false;
      this.addRolesForm.reset();
      this.checkBoxesAreChecked = false
      this.modules.map((module: any) => {
        module['isSelected'] = false;
      });
    }
    this.modalRef = this.modalService.show(template, {
      keyboard: false,
      backdrop: 'static'
    })
    this.modalRef.setClass('role-modal-custom-style');
  }

  addRoles() {
    if (this.addRolesForm.valid) {
      if (this.isEdit == true) {
        this.roles.forEach((element: any) => {
          if (element.name == this.addRolesForm.value.RoleName) {
            this.addRolesForm.value.id = element.id;
          }
        });
        this.addRolesForm.value.Module = this.moduleArr
        let data = this.addRolesForm.value
        this.service.updateRole(data).subscribe((res: any) => {
          if (res.statusCode == 200) {
            this.getRoleModule();
            this.modalRef?.hide();
            this.isEdit = false;
            this.moduleArr = [];
            this.isChecked = false;
            Swal.fire({
              icon: <any>dialogMessage.DIALOG_ICON.SUCCESS,
              text: dialogMessage.ADMIN_DIALOG_MESSAGE.ROLE_UPDATED,
              showConfirmButton: false,
              timer: 1500
            })
          } else {
            this.modalRef?.hide();
            this.isEdit = false;
            this.moduleArr = [];
            Swal.fire({
              icon: <any>dialogMessage.DIALOG_ICON.ERROR,
              text: res.message,
              showConfirmButton: false,
              timer: 1500
            })
          }
        })
      } else {
        let data = this.addRolesForm.value
        this.service.addRoles(data).subscribe((res: any) => {
          if (res.statusCode == 200) {
            this.getRoleModule();
            this.getRoles();
            this.modalRef?.hide();
            this.moduleArr = [];
            this.addRolesForm.reset();
            this.isChecked = false;
            Swal.fire({
              icon: <any>dialogMessage.DIALOG_ICON.SUCCESS,
              text: dialogMessage.ADMIN_DIALOG_MESSAGE.ROLE_ADDED,
              showConfirmButton: false,
              timer: 1500
            })
          } else {
            this.moduleArr = [];
            this.checked.forEach((element: any) => {
              element.checked = false;
            });
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

  deleteRoleByID(index: any) {
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
        let modules: any = {};
        this.RoleModule.forEach((element: any, elIndex: any) => {
          if (elIndex == index) {
            modules = element;
          }
        });
        this.roles.forEach((element: any) => {
          if (element.name == modules.roleName) {
            this.addRolesForm.value.id = element.id
          }
        });
        this.service.deleteRoleById(this.addRolesForm.value.id).subscribe((res: any) => {
          if (res.statusCode == 200) {
            Swal.fire({
              icon: <any>dialogMessage.DIALOG_ICON.SUCCESS,
              text: dialogMessage.DELETE_RESPONE_MESSAGE.OK,
              showConfirmButton: false,
              timer: 1500
            })
            this.getRoleModule();
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

}

