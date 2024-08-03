import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { Post } from '../../models/post.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  isLoggedIn: boolean = false;

  constructor(private blogService: BlogService, private authService: AuthService) { }

  ngOnInit() {
    this.isLoggedIn = !!this.authService.currentUserValue;
    this.loadPosts();
  }

  loadPosts() {
    this.blogService.getPosts().subscribe(
      posts => this.posts = posts,
      
      error => console.error('Error loading posts', error)
    );
  }
}