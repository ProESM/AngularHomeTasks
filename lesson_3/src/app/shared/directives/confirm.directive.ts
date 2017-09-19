import { Directive, OnInit, Input, HostListener } from '@angular/core';

@Directive({
  selector: '[confirm]'
})
export class ConfirmDirective implements OnInit {
    @Input() 
    public confirmMessage: string;

    constructor() {}

    ngOnInit(): void {}

    @HostListener('click')
    confirm(): void {
        if (window.confirm(this.confirmMessage)) {
            
        } else {
            (this.confirmMessage as any).preventDefault();
        }
    }
}