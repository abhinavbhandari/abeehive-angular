import { Component, OnInit } from '@angular/core';
declare var require: any;


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  private github = require("../../images/github.svg");
  private profiles = require("../../images/profiles.svg");
  constructor() { }

  ngOnInit() {
  }

}
