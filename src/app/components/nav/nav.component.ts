import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  selectedElement: any = null; 
  constructor() { }

  ngOnInit() {
  }

//  onNavGroupClick(event) {
//	var clickedElement = event.target || event.srcElement;
//	if (clickedElement.className.includes("nav-link")) {
//		var el_list = document.getElementsByClassName("nav-item active");
//		var el = el_list[0];
//		el.classList.remove("active");
//		clickedElement.parentElement.className += " active";
//	}
//  }
}
