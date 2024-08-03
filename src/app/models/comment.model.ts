import { User } from './user.model';

export interface Comment {
  id?: number;
  content: string;
  author: User;
  authorId: number;
  postId: number;
  createdAt?: Date;
}