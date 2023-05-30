import { AfterViewInit, Directive, ElementRef } from '@angular/core'

@Directive({
  selector: '[focusable]'
})
export class FocusableDirective implements AfterViewInit {

  constructor(private host: ElementRef) { }

  ngAfterViewInit() {
    this.host.nativeElement.focus()
  }

}
