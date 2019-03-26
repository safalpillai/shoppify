import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[appNumbersOnly]'
})
export class NumbersOnlyDirective {
    //numbers only 
    constructor(private el: ElementRef) { }
    
    @HostListener('input', ['$event']) onKeyDown(e) {
        let regex = /^[0-9\.]$/;
        let str = this.el.nativeElement.value;
        let subStr = str.substr(str.length - 1);
        if(!regex.test(subStr)) {
            str.length > 0 ? this.el.nativeElement.value = str.substr(0, (str.length - 1)) : this.el.nativeElement.value;
        }
    }
}
