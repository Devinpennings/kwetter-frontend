import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../models/user';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';
import {map} from 'rxjs/operators';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = '/users';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.apiUrl = environment.apiUrl + this.apiUrl;
  }

  get(id: string): Observable<User> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<User>(url);
  }

  create(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  toggleFollow(toFollow: User): Observable<User> {
    const shouldFollow = !toFollow.followers.some(u => u.id === this.authService.getUser().id);

    let url = '';
    if (shouldFollow) {
      url = `${this.apiUrl}/${toFollow.id}/follow?follower=${this.authService.getUser().id}`;
    } else {
      url = `${this.apiUrl}/${toFollow.id}/unfollow?follower=${this.authService.getUser().id}`;
    }

    return this.http.post(url, null, { observe: 'response' })
      .pipe(
        map(result => {
          if (result.ok) {
            if (shouldFollow) {
              toFollow.followers.push(this.authService.getUser());
            } else {
              toFollow.followers.splice(toFollow.followers.findIndex(u => u.id === this.authService.getUser().id), 1);
            }
            return toFollow;
          }
          return toFollow;
        })
      );
  }

}
