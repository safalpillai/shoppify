import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[appModifyUsername]'
})
export class ModifyUsernameDirective {
    //disable space & uppercase letters
    constructor(private el: ElementRef) { }
    
    @HostListener('input') onInput() {
        this.el.nativeElement.value = this.el.nativeElement.value.toLowerCase().trim();
    }
}
