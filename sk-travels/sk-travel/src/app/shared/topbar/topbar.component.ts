import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AdminService } from 'src/app/service/admin.service';
import Swal from 'sweetalert2';
import { dialogMessage } from '../constant enum\'s/message.enum';
import { TitleCasePipe } from '@angular/common';


@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {
  message: any;
  modalRef?: BsModalRef;
  dialogMessage = 'showLogoutDialog';
  adminName: any;
  titleCaseName: any;

  constructor(
    private router: Router,
    private adminSer: AdminService,
    private modalService: BsModalService,
    private titlecasePipe: TitleCasePipe
  ) { }

  ngOnInit(): void {
    this.adminName = localStorage.getItem('firstName')    
    this.titleCaseName = this.titlecasePipe.transform(this.adminName);
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
