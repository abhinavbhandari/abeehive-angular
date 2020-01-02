import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appTagHighlight]'
})
export class TagHighlightDirective {
  @Input() tagName: string;
  constructor(private el: ElementRef) { 
  }

  ngOnInit() {
	var colorHex: string;
	switch(this.tagName) {
		case "Tech":
			colorHex = "#08a31a";
			break;
		case "Music":
			colorHex = "#e35e39";
			break;
		case "Opinion":
			colorHex = "#cce63c";
			break;
		case "Travel":
			colorHex = "#36dbf5";
			break;
		case "Misc":
			colorHex = "#d11fa2";
			break;
		}
	this.el.nativeElement.style.backgroundColor = colorHex;
  }

}
