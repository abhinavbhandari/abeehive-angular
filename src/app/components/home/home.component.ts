import { Component, OnInit } from '@angular/core';
//import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { BlogPost } from '../../blogpost';
import { FirebaseService } from '../../services/firebase.service';
//import * as firebase from 'firebase';
//export interface BlogPostId extends BlogPost { id: string } 
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
//  blogPostCollection: AngularFirestoreCollection<BlogPost>;
  blogPosts: Observable<BlogPost[]>;

// constructor(private afs: AngularFirestore, private router: Router) { 
//	this.blogPostCollection = this.afs.collection<BlogPost>("PostInformation");
//
//	this.blogPosts = this.blogPostCollection
//				.snapshotChanges()
//				.pipe(
//					map(docActions => docActions.map(docA => {
//							const d = docA.payload.doc.data();
//							const id = docA.payload.doc.id;
//							return {id, ...d}
//						})));
// }

  constructor(private fs: FirebaseService, private router: Router) {
	this.blogPosts = this.fs.getBlogPosts().pipe(
				map(blogposts => blogposts.map(bp => {
						bp.date = bp.date.toDate();
						return bp;
					})
				),
				map(blogposts => {
						return blogposts.sort((a, b) => {
return new Date(b.date).getTime() - new Date(a.date).getTime()}); 
					}
				)
			)
  }

  ngOnInit() {
	//this.blogPosts = this.fs.getBlogPosts();
  }

  onCardClick(blog: BlogPost) {
	this.router.navigate(['/blogpost', blog.id])
  }  
  
}
