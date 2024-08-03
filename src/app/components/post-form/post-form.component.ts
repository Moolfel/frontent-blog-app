import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {
  postForm: FormGroup;
  isEditing = false;
  postId: number | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private blogService: BlogService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.postForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.postId = this.route.snapshot.paramMap.get('id') ? +this.route.snapshot.paramMap.get('id')! : null;
    if (this.postId) {
      this.isEditing = true;
      this.loadPost(this.postId);
    }
  }

  loadPost(id: number) {
    this.blogService.getPost(id).subscribe(
      post => {
        this.postForm.patchValue(post);
      },
      error => console.error('Error loading post', error)
    );
  }

  onSubmit() {
    if (this.postForm.invalid) {
      return;
    }

    if (this.isEditing && this.postId) {
      this.blogService.updatePost(this.postId, this.postForm.value).subscribe(
        () => {
          this.router.navigate(['/posts', this.postId]);
        },
        error => console.error('Error updating post', error)
      );
    } else {
      this.blogService.createPost(this.postForm.value).subscribe(
        post => {
          this.router.navigate(['/posts', post.id]);
        },
        error => console.error('Error creating post', error)
      );
    }
  }
}