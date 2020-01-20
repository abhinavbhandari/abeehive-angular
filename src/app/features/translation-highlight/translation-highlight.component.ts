import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

export interface SentenceInterface { text: string, id: number } 

@Component({
  selector: 'app-translation-highlight',
  templateUrl: './translation-highlight.component.html',
  styleUrls: ['./translation-highlight.component.css']
})
export class TranslationHighlightComponent implements OnInit {
  @ViewChild('textContent', { static: false }) textContent
  textLists : SentenceInterface[] = []
  constructor() { }

  ngOnInit() {	
  }

  parseContent() {
	this.textLists = [];
	var text = this.textContent.nativeElement.value;
	var splitlist = text.split('.');
	var textToInsert = "";
	for (var _i = 0; _i < splitlist.length; _i++) {
		textToInsert = splitlist[_i] + '.';
		this.textLists.push({text: textToInsert, id: _i})
	}
  }

  highlightSentence(id) {
	console.log(id);
	id = "translated_" + id;
	var el = document.getElementById(id)
	console.log(el);
	el.style.backgroundColor = "#f7ad57";
	//el.style.boxShadow = "0px 0px 8px 1px #f7ad57" 	
  }

  removeHighlight(id) {
	console.log("helloo ", id);
        id = "translated_" + id;
        var el = document.getElementById(id)
        console.log(el);
        el.style.backgroundColor = "transparent";
  }
}
