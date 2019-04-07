import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../models/user';
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as JWT from 'jwt-decode';
import {AuthInfo} from '../models/authInfo';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://192.168.178.24:8080/kwetter-1.0/api/auth';

  constructor(
    private http: HttpClient
  ) { }

  login(username: string, password: string): Observable<User> {
    const url = `${this.apiUrl}?username=${username}&password=${password}`;
    return this.http.get<User>(url, { observe: 'response' })
      .pipe(
        map(result => {
          const headers = result.headers;
          this.setSession(headers.get('Authorization'));
          return result.body;
        })
      );

  }

  logout() {
    localStorage.removeItem('authorization_token');
  }

  isLoggedIn(): boolean {
    const info = this.getInfo();
    if (info) {
      return info.exp < new Date();
    } else {
      return false;
    }
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

  private setSession(token) {
    localStorage.setItem('authorization_token', token);
  }
}
