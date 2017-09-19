import { Directive, ElementRef, OnInit, Input, Renderer2, HostListener, HostBinding } from '@angular/core';
import {Observable} from "rxjs";

@Directive({
  selector: '[changePicture]'
})
export class ChangePictureDirective implements OnInit {
    @Input() 
    public pictureUrls: string[];

    private switchRepeat = false;

    constructor(
        private el: ElementRef,
        private renderer: Renderer2
    ) {
    }

    ngOnInit(): void {
        this.renderer.setProperty(this.el.nativeElement, 'src', this.pictureUrls[0]);
    }

    @HostListener('click')
    changePicture(): void {
        this.switchRepeat = !this.switchRepeat;

        Observable.interval(1000)
        .takeWhile(() => this.switchRepeat)
        .subscribe(i => { 
            this.renderer.setProperty(this.el.nativeElement, 'src', this.getRandomPicture());
        })
    }

    getRandomPicture(): string {
        if (this.pictureUrls != null && this.pictureUrls != undefined) {
            let randomIndex = Math.floor(Math.random() * this.pictureUrls.length);
            return this.pictureUrls[randomIndex];
        } else {
            return '';
        }
    }
}