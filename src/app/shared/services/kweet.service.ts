import {EventEmitter, Injectable, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';
import {Kweet} from '../models/kweet';
import {map} from 'rxjs/operators';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class KweetService {

  @Output() updatedTimeline: EventEmitter<boolean> = new EventEmitter();
  private apiUrl = '/kweets';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.apiUrl = environment.apiUrl + this.apiUrl;
  }

  create(message: string): Observable<Kweet> {
    const url = `${this.apiUrl}?userId=${this.authService.getUser().id}`;
    const kweet = {
      message,
    };
    return this.http.post<Kweet>(url, kweet)
      .pipe(
        map(result => {
          console.log(result);
          this.updatedTimeline.emit();
          return result;
        })
      );
  }

  getByUser(id: string): Observable<Kweet[]> {
    const url = `${this.apiUrl}?userId=${id}`;
    return this.http.get<Kweet[]>(url);
  }

  getTimeline(): Observable<Kweet[]> {
    const url = `${this.apiUrl}/timeline?userId=${this.authService.getUser().id}`;
    return this.http.get<Kweet[]>(url)
      .pipe(
        map(result => {
          return result;
        })
      );
  }

}
