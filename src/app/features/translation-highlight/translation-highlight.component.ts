import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TranslationService } from '../../services/translation-service.service';
export interface SentenceInterface { text: string, id: number } 

@Component({
  selector: 'app-translation-highlight',
  templateUrl: './translation-highlight.component.html',
  styleUrls: ['./translation-highlight.component.css']
})
export class TranslationHighlightComponent implements OnInit {
  @ViewChild('textContent', { static: false }) textContent
  textLists : SentenceInterface[] = []
  constructor(public translationService: TranslationService) { }

  ngOnInit() {	
  }

  async parseContent() {
	this.textLists = [];
	var text = this.textContent.nativeElement.value;
	var en_split = text.split('.');
	var translated_obj = this.translationService.getTranslationJson(text);
	var text_jp;
	text_jp = await translated_obj.then((val) => val['translated_text']);
	//translated_obj.subscribe(
	//	val => console.log(val)
	//)
	var jp_split = text_jp.split("。");
	var textToInsert = "";
	for (var _i = 0; _i < en_split.length; _i++) {
		textToInsert = en_split[_i] + '.';
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
