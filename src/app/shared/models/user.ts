import {Kweet} from './kweet';

export class User {
  id: string;
  username: string;
  biography: string;
  location: string;
  website: string;
  picture: string;
  email: string;
  followers: User[];
  following: User[];
  postedKweets: Kweet[];
  likedKweets: Kweet[];
}
