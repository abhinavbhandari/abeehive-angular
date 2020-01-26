import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TranslationService } from '../../services/translation-service.service';
export interface SentenceInterface { text: string, id: number } 

@Component({
  selector: 'app-translation-highlight',
  templateUrl: './translation-highlight.component.html',
  styleUrls: ['./translation-highlight.component.css']
})
export class TranslationHighlightComponent implements OnInit {
  @ViewChild('textContent', { static: false }) textContent;
  @ViewChild('tButton', {static: false }) tButton;
  firstSentences: SentenceInterface[] = [];
  secondSentences: SentenceInterface[] = [];
  isReadOnly: boolean = false;
  isEdit: boolean = false;
  buttonTag: string = "Translate";
  hoverMap;
  textContentValue;
 
  constructor(public translationService: TranslationService) { }

  ngOnInit() {
	this.buttonTag = "Translate";
  }

  applyTransformation() {
	if (this.isEdit) {
		this.isEdit = false;
		this.isReadOnly = false;
		this.buttonTag = "Translate"
	} else {
		this.buttonTag = "Edit";
		this.isEdit = true;
		this.isReadOnly = true;
		this.parseContent()
	}
  }

  async parseContent() {
	this.secondSentences = [];
	this.firstSentences = [];
	var text = this.textContent.nativeElement.value;
	var translated_obj = this.translationService.getTranslationJson(text);

	var text_jp;
	var text_en;
	await translated_obj.then((val) => {
		text_jp = val['json_jp'];
		text_en = val['json_en'];
		this.hoverMap = val['jp_to_en_map'];	
	});

	var sent_jp = this.getSentenceList(text_jp);
	var sent_en = this.getSentenceList(text_en);

	this.textToInsert(sent_en, this.firstSentences);
	this.textToInsert(sent_jp, this.secondSentences);
	
	this.textContentValue = sent_en.join(" ");
	// this.textContent.nativeElement.value = sent_en.join(" ");
  }

  
  getSentenceList(text_obj) {
	var _sent = [];
	for (var _i = 0; _i < Object.keys(text_obj).length; _i++) {
		_sent.push(text_obj[_i]);
	}
	return _sent
  }


  textToInsert(sentences, insertList) {
	var inplace_text = "";
	var cur_sent;
	for (var _i = 0; _i < sentences.length; _i++) {
		cur_sent = sentences[_i];
		if (cur_sent.charAt(cur_sent.length - 1) !== '.') {
			inplace_text = sentences[_i] + '.';
		} else {
			inplace_text = sentences[_i];
		}
		insertList.push({text: inplace_text, id: _i})
	}
  }

  highlightSentence(id) {
	var t_el= document.getElementById("translated_" + id);
	var i_el = document.getElementById("inserted_" + id);
	
	t_el.style.backgroundColor = "#60d1d1";
	i_el.style.backgroundColor = "#60d1d1"
  }

  removeHighlight(id) {
	var t_el= document.getElementById("translated_" + id);
	var i_el = document.getElementById("inserted_" + id);
	
	t_el.style.backgroundColor = "transparent";
	i_el.style.backgroundColor = "transparent"
        
  }
}
