import {EventEmitter, Injectable, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';
import {Kweet} from '../models/kweet';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {SocketService} from './socket.service';
import {NzNotificationService} from 'ng-zorro-antd';

@Injectable({
  providedIn: 'root'
})
export class KweetService {

  @Output() updatedTimeline: EventEmitter<boolean> = new EventEmitter();
  private apiUrl = '/kweets';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private socketService: SocketService,
    private notificationService: NzNotificationService
  ) {
    this.apiUrl = environment.apiUrl + this.apiUrl;
    this.socketService.get().subscribe(message => {

      const kweet: Kweet = JSON.parse(message.data);

      if (kweet.author.id === authService.getUser().id) {
        this.notificationService.success('Kweet placed!', 'You placed a new kweet!');
      } else {
        this.notificationService.info('New kweet!', kweet.author.username + ' placed a new kweet!');
      }

    });
  }

  create(message: string): Observable<Kweet> {
    const url = `${this.apiUrl}?userId=${this.authService.getUser().id}`;
    const kweet = {
      message,
    };
    return this.http.post<Kweet>(url, kweet)
      .pipe(
        map(result => {
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
