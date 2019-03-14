import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[appModifyUsername]'
})
export class ModifyUsernameDirective {

    constructor(private el: ElementRef) { }
    
    @HostListener('keyup') onInput() {
        this.el.nativeElement.value = this.el.nativeElement.value.toLowerCase().trim();
    }
}
