import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appPhoneNoMask]'
})
export class PhoneNoMaskDirective {
  private el: HTMLInputElement;

  constructor(private elementRef: ElementRef) {this.el = this.elementRef.nativeElement; }
  @HostListener('input', ['$event.target.value'],)
  onKeyDown(value) {
    if(value.charAt(0) != "0") {
      this.el.value="0"+value;
    }
  }

}
