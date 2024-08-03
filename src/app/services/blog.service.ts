import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/post.model';
import { Comment } from '../models/comment.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
    private apiUrl = 'http://127.0.0.1:8000';

    constructor(private http: HttpClient, private authService: AuthService) { }
    
    private getAuthHeaders(): HttpHeaders {
        const currentUser = this.authService.currentUserValue;
        return new HttpHeaders({
        'Authorization': `Token ${currentUser?.token || ''}`
        });
    }

    getPosts(): Observable<Post[]> {
        return this.http.get<Post[]>(`${this.apiUrl}/api/posts/`);
    }

    getPost(id: number): Observable<Post> {
        return this.http.get<Post>(`${this.apiUrl}/api/posts/${id}/`);
    } 

    createPost(post: Post): Observable<Post> {
        return this.http.post<Post>(
            `${this.apiUrl}/api/posts/`, post, { headers: this.getAuthHeaders() }
        );
    }

    updatePost(id: number, post: Post): Observable<Post> {
        return this.http.put<Post>(`${this.apiUrl}/api/posts/${id}/`, post);
    }

    deletePost(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/api/posts/${id}`);
    }

    addComment(postId: number, comment: string): Observable<Comment> {
        const payload = {
            post: postId,
            content: comment
        };
        return this.http.post<Comment>(
            `${this.apiUrl}/api/comments/`, payload, { headers: this.getAuthHeaders() }
        );
    }
    getComments(postId: number): Observable<Comment[]> {
        return this.http.get<Comment[]>(`${this.apiUrl}/api/comments/?post=${postId}`);
    }
    getCommentsByPost(postId: number): Observable<Comment[]> {
        return this.http.get<Comment[]>(`${this.apiUrl}/api/posts/${postId}/comments/`);
    }
}