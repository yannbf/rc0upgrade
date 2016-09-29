import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[elastic-header]'
})
export class ElasticHeader {
  private el: HTMLElement;
  private ticking: any;
  private translateAmt: any;
  private scaleAmt: any;
  private scrollTop: any;
  private lastScrollTop: any;
  private scrollerHandle: any;
  private header: any;
  private headerHeight: any;

  constructor(element: ElementRef){
    this.el = element.nativeElement;
    this.ticking = false;
    this.translateAmt = null;
    this.scaleAmt = null;
    this.scrollTop = null;
    this.lastScrollTop = null;
  }

  ngOnInit() {
    this.scrollerHandle = this.el.children[0];
    this.header = document.getElementById('elastic-header');
    this.headerHeight = this.scrollerHandle.clientHeight;
    this.header.style.webkitTransformOrigin = 'center bottom';
    var me = this;
    window.addEventListener('resize', function() {
      this.headerHeight = this.scrollerHandle.clientHeight;
    }, false);
    this.scrollerHandle.addEventListener('scroll', function(){
      if(!me.ticking){
        window.requestAnimationFrame(function(){
          me.updateElasticHeader();
        });
      }
      this.ticking = true;
    });
  }
  
  updateElasticHeader(){
    this.scrollTop = this.scrollerHandle.scrollTop;
    if (this.scrollTop >= 0) {
      this.translateAmt = this.scrollTop / 2;
      this.scaleAmt = 1;
    } else {
      this.translateAmt = 0;
      this.scaleAmt = -this.scrollTop / this.headerHeight + 1;
    }
    this.header.style.webkitTransform = 'translate3d(0,'+this.translateAmt+'px,0) scale('+this.scaleAmt+','+this.scaleAmt+')';
    this.ticking = false;
  }
}