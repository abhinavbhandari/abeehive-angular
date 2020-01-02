import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BlogPost } from '../../blogpost';
import { FirebaseService } from '../../services/firebase.service';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-blogpage',
  templateUrl: './blogpage.component.html',
  styleUrls: ['./blogpage.component.css']
})
export class BlogpageComponent implements OnInit {
  blogPost: Observable<BlogPost>;
  
  constructor(private router: Router, private route: ActivatedRoute, private fs: FirebaseService) { 
	this.blogPost = this.route.paramMap.pipe(
		switchMap((params) => this.fs.getBlogPost(params.get('id')))
	)
  }

  ngOnInit() {
  }
}
