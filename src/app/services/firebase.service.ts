import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { BlogPost } from '../blogpost';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})

export class FirebaseService {
  blogPostCollection: AngularFirestoreCollection<BlogPost>;
  blogPosts: Observable<BlogPost[]>;
  
  constructor(public afs: AngularFirestore) { 
	this.blogPostCollection = this.afs.collection<BlogPost>("PostInformation");

        this.blogPosts = this.blogPostCollection
                                .snapshotChanges()
                                .pipe(
                                        map(docActions => docActions.map(docA => {
                                                        const d = docA.payload.doc.data();
                                                        const id = docA.payload.doc.id;
                                                        return {id, ...d}
                                                })));	
  }

  createPost(title, text, date, tag) {
     var storageRef = firebase.storage().ref();
     var filename = title.split(" ").join("_") + ".md"
     var file = new Blob([text], { type: "text/plain" });
     var fileref = storageRef.child("notebooks/" + filename);
     fileref.put(file).then(function(snapshot) {
  		console.log('Uploaded a blob or file!');
	});
 
     var postObject = {
	"title": title,
	"filename": filename,
	"date": date,
	"tag": tag 
     }
     this.afs.collection('PostInformation').add(postObject);
          
  }

  getBlogPosts() : Observable<BlogPost[]> {
	return this.blogPosts;
  }

  getBlogPost(id: string) {
	var storageRef = firebase.storage().ref().child("notebooks/");
	var text;	
	return this.getBlogPosts().pipe(
		map(blogPostArr => blogPostArr.find(bp => bp.id === id)),
		map(bp => {
			console.log(bp);
			storageRef.child(bp.filename)
				.getDownloadURL()
				.then(function(url) {
					var xhr = new XMLHttpRequest();
					xhr.responseType = 'text';
					xhr.onload = function(event) {
						bp.text = xhr.response;
					}
					xhr.open('GET', url);
					xhr.send();
				});
			return bp;
			}
		)	
	)
  } 
}
