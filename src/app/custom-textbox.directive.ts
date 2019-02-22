import { Directive, ElementRef, Renderer, HostListener } from '@angular/core';

@Directive({
    selector: '[appCustomTextbox]'
})
export class CustomTextboxDirective {

    constructor(private el: ElementRef, private renderer: Renderer) { }
    
    @HostListener('keyup') onInputChange() {
        const _el = this.el.nativeElement;
        _el.value == '' ? this.renderer.setElementClass(_el.parentElement, 'filled', false) : this.renderer.setElementClass(_el.parentElement, 'filled', true);
    }
}
