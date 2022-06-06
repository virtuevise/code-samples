import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AdminService } from 'src/app/service/admin.service';
import Swal from 'sweetalert2';
import { dialogMessage } from '../constant enum\'s/message.enum';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.scss']
})
export class UserHeaderComponent implements OnInit {
  modalRef?: BsModalRef;
  message: any;
  dialogMessage = 'showLogoutDialog';
  userName: any;
  titleCaseName: any;
  constructor
    (
      private modalService: BsModalService,
      private router: Router,
      private adminSer: AdminService,
      private titlecasePipe: TitleCasePipe
    ) { }

    ngOnInit(): void {
    this.userName = localStorage.getItem('firstName')
    this.titleCaseName = this.titlecasePipe.transform(this.userName);
  }

  checkBalance(template: TemplateRef<any>, index: any) {
    this.modalRef = this.modalService.show(template, {
      keyboard: false,
      backdrop: 'static'
    })
    this.modalRef.setClass('modal-custom-style');
  }

  groupRequest() {

  }

  logOut() {
    Swal.fire({
      text: this.titleCaseName + ' ' + dialogMessage.LOGOUT_DIALOG_MESSAGE.MESSAGE,
      icon: <any>dialogMessage.DIALOG_ICON.WARNING,
      showCancelButton: true,
      allowOutsideClick: false,
      confirmButtonColor: dialogMessage.DIALOG_BUTTON_COLOR.COLOR,
      confirmButtonText: dialogMessage.DIALOG_BUTTON.CONFIRM,
      cancelButtonText: dialogMessage.DIALOG_BUTTON.CANCEL,
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        this.router.navigateByUrl("/LogIn");
      }
    })
  }


}

