import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {User} from '../models/user';
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as JWT from 'jwt-decode';
import {AuthInfo} from '../models/authInfo';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: User;
  private userSubject: Subject<User>;
  private apiUrl = 'http://192.168.178.157:8080/kwetter-1.0/api/auth';

  constructor(
    private http: HttpClient,
  ) {
    this.userSubject = new Subject();
  }

  login(username: string, password: string): Observable<User> {
    const url = `${this.apiUrl}?username=${username}&password=${password}`;
    return this.http.get<User>(url, { observe: 'response' })
      .pipe(
        map(result => {
          const headers = result.headers;
          this.setSession(headers.get('Authorization'));
          this.setUser(result.body);
          return result.body;
        })
      );

  }

  logout() {
    localStorage.removeItem('authorization_token');
    localStorage.removeItem('user');
  }

  isLoggedIn(): boolean {
    const info = this.getInfo();
    if (info) {
      return info.exp < new Date();
    } else {
      return false;
    }
  }

  getUser(): User {
    if (this.user === undefined) {
      this.setUser(JSON.parse(localStorage.getItem('user')));
    }

    return this.user;
  }

  getUserAsObservable(): Observable<User> {
    return this.userSubject.asObservable();
  }

  getInfo(): AuthInfo {
    const token = this.getToken();
    if (token) {
      return JWT(token);
    } else {
      return null;
    }
  }

  getToken() {
    return localStorage.getItem('authorization_token');
  }

  private setUser(user: User) {
    this.userSubject.next(user);
    this.user = user;
    localStorage.setItem('user', JSON.stringify(user));
  }

  private setSession(token) {
    localStorage.setItem('authorization_token', token);
  }
}
