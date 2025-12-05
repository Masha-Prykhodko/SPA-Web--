import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHoverStyle]'
})
export class HoverStyle {
  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'translateY(-4px)');
    this.renderer.setStyle(this.el.nativeElement, 'box-shadow', '0 6px 15px rgba(0,0,0,0.2)');
    this.renderer.setStyle(this.el.nativeElement, 'transition', '0.2s ease');
    this.renderer.setStyle(this.el.nativeElement, 'cursor', 'pointer');
  } // При наведенні миші на картку

  @HostListener('mouseleave')
  onMouseLeave() {
    this.renderer.removeStyle(this.el.nativeElement, 'transform');
    this.renderer.removeStyle(this.el.nativeElement, 'box-shadow');
  } // При відведенні миші від картки
}
