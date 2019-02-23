import { Directive, ElementRef, Renderer, HostListener, AfterViewInit } from '@angular/core';

@Directive({
    selector: '[appCustomTextbox]'
})
export class CustomTextboxDirective implements AfterViewInit{

    constructor(private el: ElementRef, private renderer: Renderer) {}
    
    @HostListener('keyup') onInputChange() {
        this.setPlaceholder(this.el);
    }

    ngAfterViewInit() {
        this.setPlaceholder(this.el);
    }

    setPlaceholder(target: any) {
        const _el = target.nativeElement;
        _el.value == '' ? this.renderer.setElementClass(_el.parentElement, 'filled', false) : this.renderer.setElementClass(_el.parentElement, 'filled', true);
    }
}
