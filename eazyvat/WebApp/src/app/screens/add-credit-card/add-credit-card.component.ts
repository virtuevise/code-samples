import { Component, createPlatform, ViewChild, OnInit,ElementRef} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { PaymentService } from 'src/app/services/payment.service';
import { SuccessMessageComponent } from '../success-message/success-message.component';

@Component({
  selector: 'app-add-credit-card',
  templateUrl: './add-credit-card.component.html',
  styleUrls: ['./add-credit-card.component.scss']
})
export class AddCreditCardComponent implements OnInit {
 /*  @ViewChild('ExpiryDate', { static: false }) ExpiryDate: ElementRef<HTMLInputElement>;  */
  ExpiryDate:string='dddd';
  /* isShowNewProfile:boolean=true;  */
  status: any;
  cardForm: FormGroup;
  isDisabled: boolean=true;
  nextPage: string;
  constructor(private router: Router, 
    private route: ActivatedRoute,
     public dialog: MatDialog, 
     private fb: FormBuilder,
     private _paymentService: PaymentService,
     private AccountService:AccountService
     ) { }

  onShowPaymentDetails() {
    sessionStorage.setItem('SessionData','Qfswtt235ARdswWVsxX6q95aqWfccXyOprst'); 
    // Opens popup for payment success/error
    this.openSuccess();
    // this.router.navigate(['PaymentSummary']);
  }

  openSuccess() {
    const dialogRef = this.dialog.open(SuccessMessageComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['purchasesSummary']);
    });
  }



  changeSlash(val,e){
   
    if (val==2)
   {
     
    
   }
   else{
   
   } 

  }
  

  goToeazyPass() {
    this.router.navigateByUrl('/EazyPassComplete/false/no');
  }
  async ngOnInit() {
    try {
      
      const status = this.route.snapshot.paramMap.get('status');
      /* this.isShowNewProfile=JSON.parse(status); */
      this.status = JSON.parse(status);

    } catch (error) {
      console.error(error);
    }
    this.createPlatform();
  }
  createPlatform() {
    this.cardForm = this.fb.group({
      CardNumber: [''],
      ExpiryDate: [''],
      CVV: ['']
    });
  }
  get formControls() { return this.cardForm.controls; }

  SubmitData() {
    if (this.cardForm.valid) {
      let expiry = this.cardForm.value.ExpiryDate.split("/");
      let data = {
        CardNumber: this.cardForm.value.CardNumber,
        ExpiryYear: expiry[1],
        ExpiryMonth: expiry[0],
        UserId: this.AccountService.JwtDecoder(localStorage.getItem("Token")),
        CVV: this.cardForm.value.CVV,
      }
    this._paymentService.addUserCard(data).subscribe((data: any) => {
      if(data.statusCode== 200){
        // this.openSuccess();
        sessionStorage.setItem("token","sfrhgbe\fgxsgbffshbcvcdshcgbjsgcnxbcgxbehegfnc,ncbhfcxjhcbcbbvncbdncbxcbnbdcxhnvcbcxbbcxncbcxvbbngvnbbgnfcdc");
        sessionStorage.setItem("UserName",data.responseData);
      } else {
        // Show Error
      }
      // NOTE: This is temp
      this.openSuccess();
      
    });
    } else {
      console.error("please fill out all the fields");
    }
  }

  onSaveUpdatePayment(){
    sessionStorage.setItem('SessionData','Qfswtt235ARdswWVsxX6q95aqWfccXyOprst');
    //goto servise
    debugger;
    this.SubmitData()
    this.router.navigateByUrl("/linksOptions");
  }
  savesession(){
    debugger;
    sessionStorage.setItem('SessionData','Qfswtt235ARdswWVsxX6q95aqWfccXyOprst');   
     if (this.status == false)
     this.router.navigateByUrl("purchasesSummary")
      else
    this.router.navigateByUrl("/PaymentSummary");
  }
}


