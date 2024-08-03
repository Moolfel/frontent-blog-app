import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent {
  
  @Input() postId: number | undefined;
  @Output() commentAdded = new EventEmitter<void>(); 
  commentForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private blogService: BlogService
  ) {
    this.commentForm = this.formBuilder.group({
      content: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.commentForm.invalid || !this.postId) {
      return;
    }

    console.log('Adding comment', this.commentForm.value.content);
    console.log('Post ID', this.postId);

    this.blogService.addComment(this.postId, this.commentForm.value.content).subscribe(
      () => {
        this.commentForm.reset();
        this.commentAdded.emit();
      },
      error => console.error('Error adding comment', error)
    );
  }
}