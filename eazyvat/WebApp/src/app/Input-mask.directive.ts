import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[formControlName][appInputMask]',
})
export class InputMaskDirective {

  @HostListener('input', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    var regExp = /^[0-9]*$/;
    
    if(input.value.length == 2) {
      if(!regExp.test(input.value)){
          input.value = '';
          return;
      }
      else {
        let value = Number(input.value)
        if(value < 1 || value > 12) {
          input.value = '';
          return;
        }
      }
     }
    
    else if(input.value.length == 5) {
          let value = Number(input.value.substring(3));
          if(value < 21 || value > 31) {
            input.value = '';
            return;
          }
       

    }

    const trimmed = input.value.replace(/\s+/g, '').slice(0, input.value.indexOf('/')==-1?4:5);
    if (trimmed.length == 2) {
      return (input.value = `${trimmed.slice(0, 2)}/${trimmed.slice(trimmed.indexOf('/')==-1?2:3)}`);
    }
    
  }
}