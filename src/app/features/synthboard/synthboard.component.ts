import { Component, OnInit,  ViewChild, ViewChildren, ElementRef, QueryList, Renderer2, AfterViewInit } from '@angular/core';
import { Circle } from './circle';

import anime from 'animejs';
@Component({
  selector: 'app-synthboard',
  templateUrl: './synthboard.component.html',
  styleUrls: ['./synthboard.component.css']
})


export class SynthboardComponent implements OnInit, AfterViewInit {
  @ViewChildren("keyNotes") noteList: QueryList<ElementRef>;
  @ViewChild("myCanvas", {static: false} ) myCanvas: ElementRef;

  notes = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
  notesDic = {'a': '#ff5757', 'b': '#ff4726', 'c': '#faf323', 'd': '#f5a822', 'e': '#24e3d6', 'f': '#4ceb17', 'g': '#f0c022'};
  notesPressed = {'a': '#bd1a1a', 'b': '#b33610', 'c': '#968f06', 'd': '#b57505', 'e': '#0d9188', 'f': '#328f13', 'g': '#ad8913'};
  curNote;
  context;
  cW;
  cH;
  animations = [];
  animate;
  
  constructor(private renderer: Renderer2) { }

  ngOnInit() {} 

  ngAfterViewInit() {
	this.noteList.toArray().forEach(el => {
		this.setBackground(el, this.notesDic[el.nativeElement.id]);
		this.setBoxShadow(el, `0px 6px 0px ${this.notesPressed[el.nativeElement.id]}`); 
	});
	this.context = this.myCanvas.nativeElement.getContext("2d");
	this.resizeCanvas();
	var animations = this.animations;
	var myCanvas = this.myCanvas;
	var context = this.context;
	this.animate = anime({
		duration: Infinity,
		update: function() {
			context.fillStyle = 'white';
			context.fillRect(0, 0, myCanvas.nativeElement.width, myCanvas.nativeElement.height);
			animations.forEach(function(anim) {
				anim.animatables.forEach(function(animatable) {
        				animatable.target.draw();
      				});
			})
		}
	});
  }

  setBackground(el, color) {
	this.renderer.setStyle(el.nativeElement,
				'background-color',
				color);
	
  }

  setBoxShadow(el, shadowStr) {
	this.renderer.setStyle(el.nativeElement, 
				'box-shadow', 
				shadowStr);	
  }

  pressNote(key: string) {
	this.curNote = key;
	this.noteList.toArray().forEach(el => {
		if (el.nativeElement.id == key) {
			this.renderer.addClass(el.nativeElement, 'active');
			this.setBackground(el, this.notesPressed[this.curNote]);
			this.setBoxShadow(el, 'none');
		}
	})
	this.handleEvent();
  }


 // removeAnimation(animation) {
 //       var index = this.animations.indexOf(animation);
 //       if (index > -1) this.animations.splice(index, 1);
 // }

  calcPageFillRadius(x, y, cW, cH) {
	var l = Math.max(x - 0, cW - x);
	var h = Math.max(y - 0, cH - y);
	//var l = x;
	//var h = y;
	return Math.sqrt(Math.pow(l, 2) + Math.pow(h, 2));
  }

  handleEvent() {
	var cW = this.cW;
	var cH = this.cH;
	var epageX = anime.random(cW/4, cW/2 + cW/4);
	var epageY = anime.random(cH/4, cH/2 + cH/4);
	var targetR = this.calcPageFillRadius(epageX, epageY, cW, cH);
	var nextColor = this.notesDic[this.curNote];
	var minCoverDuration = 750;
	var curNote = this.curNote;
	var pageFill = new Circle(epageX, epageY, 0, nextColor, null, this.context, 1);
	var removeAnimation = function (animations, animation) {
		var index = animations.indexOf(animation);
  		if (index > -1) animations.splice(index, 1);
	};
	var animations = this.animations;
	var fillAnimation = anime({
		targets: pageFill,
		r: targetR,
		duration:  Math.max(targetR / 2 , minCoverDuration ),
		easing: "easeOutQuart",
		complete: function(){
			removeAnimation.call(this, animations, fillAnimation);
		}	
	});
	
	var ripple = new Circle(epageX, epageY, 0, 'white', {width: 3, color: 'white'}, this.context, 1);

	var rippleAnimation = anime({
		targets: ripple,
		r: 200,
		opacity: 0,
		easing: 'easeOutExpo',
		duration: 1500,
		complete: removeAnimation(animations, rippleAnimation)
	});

	var particles = [];
	for (var i=0; i<32; i++) {
		var particle = new Circle(epageX, epageY, anime.random(24, 48), 'white', null, this.context, 1);
		particles.push(particle);
	}
	
		
	var particlesAnimation = anime({
		targets: particles,
		x: function(particle){
			return particle.x + anime.random(-200, 200);
		},
		y: function(particle){
			return particle.y + anime.random(-200* 1.15, 200* 1.15);
		},
		r: 0,
		easing: "easeOutExpo",
		duration: anime.random(1000,1300),
		complete: removeAnimation(animations, particlesAnimation)
	});
	
	this.animations.push(fillAnimation, rippleAnimation, particlesAnimation);
  }

  releaseNote() {
	this.noteList.toArray().forEach(el => {
		if (el.nativeElement.id == this.curNote) {
			this.renderer.removeClass(el.nativeElement, 'active');
			this.setBackground(el, this.notesDic[el.nativeElement.id]);
			this.setBoxShadow(el, `0px 6px 0px ${this.notesPressed[el.nativeElement.id]}`);	
		}
	});
  }

  resizeCanvas() {
	this.cW = this.myCanvas.nativeElement.offsetWidth;
  	this.cH = this.myCanvas.nativeElement.offsetHeight;
	
	this.myCanvas.nativeElement.width = this.cW * devicePixelRatio;
  	this.myCanvas.nativeElement.height = this.cH * devicePixelRatio;
  }
}
