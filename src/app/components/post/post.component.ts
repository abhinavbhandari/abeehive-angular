import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  tryLogout() {
    this.authService.doLogout();
  }
}
