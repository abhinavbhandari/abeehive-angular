import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-postform',
  templateUrl: './postform.component.html',
  styleUrls: ['./postform.component.css'],
  providers: [DatePipe]
})
export class PostformComponent implements OnInit {
  tags = ['Tech', 'Music', 'Opinion', 'Travel', 'Misc'];
  blogPostForm = this.fb.group({
  titleText: [''],
  selectionText: new FormControl(this.tags[0], Validators.required),
  postText: ['']
  })
  markdown = "hello";
  constructor(private fb: FormBuilder, public firebaseService: FirebaseService, private dp: DatePipe) { 
 }

  ngOnInit() {
  }

  onSubmit() {
	var title = this.blogPostForm.value.titleText;
	var text = this.blogPostForm.value.postText;
	var date = new Date();
	var selectedTag = this.blogPostForm.value.selectionText;
	this.firebaseService.createPost(title, text, date, selectedTag);
  }
}
