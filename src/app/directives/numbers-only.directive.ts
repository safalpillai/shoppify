import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[appNumbersOnly]'
})
export class NumbersOnlyDirective {
    //numbers only 
    constructor(private el: ElementRef) { }
    
    @HostListener('input', ['$event']) onKeyDown(e) {
        this.el.nativeElement.value = this.el.nativeElement.value.replace(/[^0-9]/g, '');
    }

}
