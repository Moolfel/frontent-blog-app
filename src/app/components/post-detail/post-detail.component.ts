import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { AuthService } from '../../services/auth.service';
import { Post } from '../../models/post.model';
import { Comment } from '../../models/comment.model';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  post: Post | null = null;
  comments: Comment[] = [];
  isAuthor = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private blogService: BlogService,
    public authService: AuthService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadPost(+id);
    }
  }

  loadPost(id: number) {
    this.blogService.getPost(id).subscribe(
      post => {
        this.post = post;
        // console.log("Post ----->>: ", post);
        // console.log("Current User id----->>: ", this.authService.currentUserValue?.id);
        // console.log("Post Author id----->>: ", post.author.id);
        this.isAuthor = this.authService.currentUserValue?.id === post.author.id;
        this.loadComments(post.id);
      },
      error => console.error('Error loading post', error)
    );
  }
  loadComments(postId: number) {
    this.blogService.getCommentsByPost(postId).subscribe(
      comments => {
        this.comments = comments;
        console.log("Comments ----->>: ", comments);
      },
      error => console.error('Error loading comments', error)
    );
  }
  onCommentAdded() {
    if (this.post) {
      this.loadComments(this.post.id); // Refresh the comments list
    }
  }

  deletePost() {
    if (this.post && confirm('Are you sure you want to delete this post?')) {
      this.blogService.deletePost(this.post.id).subscribe(
        () => {
          // Navigate back to post list
          this.router.navigate(['/posts']);
        },
        error => console.error('Error deleting post', error)
      );
    }
  }
}