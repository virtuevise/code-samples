import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { AccountService } from 'src/app/services/account.service';
import { AuthContextService } from 'src/app/services/auth-context.service';
import { ScanApiService } from 'src/app/services/scan-api.service';
import { IScanResponse } from 'src/app/shared/model/scan-response.model';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { TransformHelperService } from 'src/app/shared/services/transform-helper.service';
import { blob, blob1, blobimg, canadaBlob } from 'src/app/shared/static/passport-convert';
import { PassportErrorMessageComponent } from '../passport-error-message/passport-error-message.component';
import { FileService } from 'src/app/core/services/file.service';
import { WebcamImage, WebcamUtil, WebcamInitError } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';


declare const window: any;
declare const navigator: any;
@Component({
  selector: 'app-scan-passport',
  templateUrl: './scan-passport.component.html',
  styleUrls: ['./scan-passport.component.scss']
})
export class ScanPassportComponent implements OnInit {
  /*  isShowNewProfile:boolean=true;  */
  IsShowImgPass: boolean = true;
  IsShowVideo: boolean = false;

  status: boolean;
  scanCounter = 0;
  showWebcam = false;
  isCameraExist = true;
  capturedImg;
  errors: WebcamInitError[] = [];
  fullImagePath: string;
  // webcam snapshot trigger**
  private trigger: Subject<void> = new Subject<void>();
  private nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();

  constructor(private spinner: SpinnerVisibilityService,
    private accountService: AccountService,
    private fileService: FileService,
    private authCtx: AuthContextService,
    private transformService: TransformHelperService,
    private scanService: ScanApiService,
    private messageService: MessagesService,
    private translate: TranslateService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute) { }


  NextStep() {
    debugger
    this.openInfo();


  }

  openInfo() {
    // Open popup with passport error
    const dialogRef = this.dialog.open(PassportErrorMessageComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.router.navigateByUrl(`/accountDetails/${this.status}`);
    });
  }


  async ngOnInit() {
    debugger
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.isCameraExist = mediaDevices && mediaDevices.length > 0;
      });

    try {

      const status = this.route.snapshot.paramMap.get('status');
      this.status = JSON.parse(status);
    } catch (error) {
      console.error(error);
    }

  }

  takeSnapshot(): void {
    this.trigger.next();
    this.spinner.show();

  }


  goToLinkOption() {
    this.router.navigateByUrl("/linksOptions");
  }

  handleInitError(error: WebcamInitError) {
    this.errors.push(error);
  }

  changeWebCame(directionOrDeviceId: boolean | string) {
    this.nextWebcam.next(directionOrDeviceId);
  }

  handleImage(webcamImage: WebcamImage) {
    
    this.capturedImg = webcamImage.imageAsBase64;
    this.tempScanPassport(this.capturedImg);
  }

  get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  get nextWebcamObservable(): Observable<boolean | string> {
    return this.nextWebcam.asObservable();
  }

  async tempScanPassport(scannedImage: string) {
    try {
      const result = await this.scanService.scanPassport(this.capturedImg);
      const scanData: IScanResponse = await result.json();
      this.accountService.passportData = scanData.result;
      const flagUpdate = this.route.snapshot.paramMap.get('flag');

      if (flagUpdate == "no") {
        if (scanData.reportedError != undefined || scanData.message != undefined) {
          alert(
            "We could not validate your passport. Please try again with another picture of your passport."
          );
          this.scanCounter += 1;
          if (this.scanCounter >= 3) {
            this.router.navigate(["accountDetails/false/no"]);
            return false;
          }
        } else {
          this.router.navigate(["accountDetails/true/no"]);
          return true;
        }
      } else {
        if (scanData.reportedError != undefined || scanData.message != undefined) {
          alert(
            "We could not validate your passport. Please try again with another picture of your passport."
          );
          this.scanCounter += 1;
          if (this.scanCounter >= 3) {
            this.router.navigate(["accountDetails/false/yes"]);
            return false;
          }
        } else {
          this.router.navigate(["accountDetails/true/yes"]);
          return true;
        }
      }
    } catch {
      if (this.scanCounter >= 3) {
       
          this.router.navigate(["accountDetails/false"]);
      
        return false;
      }
    }finally {
      this.spinner.hide();
    }
  }


  OpenCamera() {
    this.showWebcam = true;
  }

}
  // OpenCamera() {
  //   this.IsShowImgPass = false;
  //   this.IsShowVideo = true;

  //   setTimeout(() => {

  //     const canvas: HTMLCanvasElement = document.getElementById(
  //       "canvas"
  //     ) as HTMLCanvasElement;
  //     const context: CanvasRenderingContext2D = canvas.getContext("2d");
  //     const video: any = document.getElementById("video");
  //     let mediaConfig = {
  //       video: {
  //         facingMode: { exact: "user" },
  //       },
  //     };
  //     let errBack = function (e) {
  //       console.error("An error has occurred!", e);
  //     };
  //     // // Put video listeners into place
  //     if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  //       navigator.mediaDevices.getUserMedia(mediaConfig).then((stream) => {
  //         //video.src = window.URL.createObjectURL(stream);
  //         video.srcObject = stream;
  //         video.play();
  //       });
  //     } else if (navigator.getUserMedia) {
  //       // Standard
  //       // tslint:disable-next-line:only-arrow-functions
  //       navigator.getUserMedia(
  //         mediaConfig,
  //         function (stream) {
  //           video.src = stream;
  //           video.play();
  //         },
  //         errBack
  //       );
  //     } else if (navigator.webkitGetUserMedia) {
  //       // WebKit-prefixed
  //       navigator.webkitGetUserMedia(
  //         mediaConfig,
  //         (stream) => {
  //           video.src = window.webkitURL.createObjectURL(stream);
  //           video.play();
  //         },
  //         errBack
  //       );
  //     } else if (navigator.mozGetUserMedia) {
  //       // Mozilla-prefixed
  //       navigator.mozGetUserMedia(
  //         mediaConfig,
  //         (stream) => {
  //           video.src = window.URL.createObjectURL(stream);
  //           video.play();
  //         },
  //         errBack
  //       );
  //     }
  //     // // Trigger photo take
  //     document.getElementById("snap").addEventListener("click", async () => {
  //       try {
  //         this.spinner.show();
  //         context.drawImage(video, 0, 0, 330, 360);
  //         const base64str = context.canvas.toDataURL("image/png", 1);
  //         const base64result = base64str.substr(base64str.indexOf(",") + 1);
  //         const blobBin = atob(canvas.toDataURL().split(",")[1]);

  //         var array = [];

  //         for (var i = 0; i < blobBin.length; i++) {
  //           array.push(blobBin.charCodeAt(i));
  //         }

  //         var file = new Blob([new Uint8Array(array)], {
  //           type: "image/png",
  //         }) as File;

  //         console.log("start scanning - " + new Date());
  //         let result: any;
  //         if (environment.production) {
  //           result = await this.scanService.scanPassport(base64result);
  //         } else {
  //           result = await this.scanService.scanPassport(blobimg);
  //         }

  //         console.log("end scanning - " + new Date());

  //         const scanData: IScanResponse = await result.json();

  //         if (scanData.reportedError !== undefined) {
  //           if (this.scanCounter > 2) {
  //             this.router.navigate(["accountDetails/0"]);
  //             return false;
  //           }

  //           alert(
  //             "We could not validate your passport. Please try again with another picture of your passport."
  //           );

  //           return;
  //         }
          // const passport = this.transformService.scanToPassport(scanData.result);

  //         passport.ImagePassport = await this.fileService.upload(file);

  //         console.log(passport.ImagePassport);

  //         const tokenRes = await this.accountService.scanPassport(passport);

  //         this.authCtx.userToken = tokenRes.Token;

  //         this.messageService.sendAvatarState(true);

  //         this.router.navigate(["accountDetails/1"]);
  //       } catch (error) {
  //         console.log(error);
  //         if (this.scanCounter > 2) {
  //           this.router.navigate(["accountDetails/0"]);
  //           return false;
  //         }

  //       } finally {
  //         this.spinner.hide();
  //       }
  //     });
  //   }, 1000)
  // }


  //  get triggerObservable(): Observable<void> {
  //    return this.trigger.asObservable();
  //  }
  //  get nextWebcamObservable(): Observable<boolean | string> {
  //    return this.nextWebcam.asObservable();
  //  }
  //  changeWebCame(directionOrDeviceId: boolean | string) {
  //    this.nextWebcam.next(directionOrDeviceId);
  //  }
  //  takeSnapshot(): void {
  //    debugger
  //    this.trigger.next();
  //  }

  //  onOffWebCame() {
  //    this.showWebcam = !this.showWebcam;
  //  }







  //async ngOnInit() {
  //      // if (scanData.reportedError !== undefined) {
  //      //   alert(
  //      //     "We could not validate your passport. Please try again with another picture of your passport."
  //      //   );
  //      //   return;
  //      // }
  //      const passport = this.transformService.scanToPassport(scanData.result);

  //      passport.ImagePassport = await this.fileService.upload(file);

  //      console.log(passport.ImagePassport);

  //      const tokenRes = await this.accountService.scanPassport(passport);

  //      this.authCtx.userToken = tokenRes.Token;

  //      this.messageService.sendAvatarState(true);

  //       this.router.navigate(["accountDetails/1"]);
  //    } catch (error) {
  //      console.log(error);
  //      if (this.scanCounter > 2) {
  //      this.router.navigate(["accountDetails/0"]);
  //      return false;
  //    }

  //    } finally {
  //     this.spinner.hide();
  //    }
  //  });
  //  },1000)
  //}

  //async ngOnInit() {


  //}


