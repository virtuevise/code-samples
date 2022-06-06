import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-book-now',
  templateUrl: './book-now.component.html',
  styleUrls: ['./book-now.component.scss']
})
export class BookNowComponent implements OnInit {
  bookNowForm!: FormGroup;
  filteredData: any;
  searchedListData: any;
  refreshedPageFilteredData: any;
  constructor
    (
      private fb: FormBuilder,
      private userService: UserService,
    ) { }

  ngOnInit(): void {
    this.userService.filteredDataSubject.subscribe(data => {
      this.searchedListData = data
    })
    if (this.searchedListData == "") {
      this.searchedListData = null
    }
    if (this.searchedListData != null || undefined) {
      localStorage.setItem('filteredData', JSON.stringify(this.searchedListData));
    }
    if (this.searchedListData == null) {
      this.refreshedPageFilteredData = localStorage.getItem('filteredData');
      let parsedObject = JSON.parse(this.refreshedPageFilteredData)
      this.searchedListData = parsedObject
    }
    this.initForm();
  }

  ngOnDestroy(): void {
    localStorage.removeItem('filteredData')
  }

  initForm() {
    this.bookNowForm = this.fb.group({
      title: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      contact: ['', Validators.required],
      internalNote: ['', Validators.required],
    })
  }

  onSubmit() {
    this.bookNowForm.markAllAsTouched();
    if (this.bookNowForm.valid) {
      let data = this.bookNowForm.value;
      this.userService.bookNow(data).subscribe((res: any) => {
        if (res.statusCode == 200) {
          localStorage.removeItem('filteredData')
        } else {
          Swal.fire({
            icon: 'error',
            text: res.message,
            showConfirmButton: false,
            timer: 1500
          })
        }
      })
    }
  }

}
