import { User } from './user.model';
import { Comment } from './comment.model';

export interface Post {
  id: number;
  title: string;
  content: string;
  author: User;
  authorId: number;
  comments?: Comment[];
  createdAt?: Date;
  updatedAt?: Date;
}
