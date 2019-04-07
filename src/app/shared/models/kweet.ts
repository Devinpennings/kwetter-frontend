import { User } from './user';

export class Kweet {
  id: string;
  message: string;
  author: User;
  likers: User[];
}
