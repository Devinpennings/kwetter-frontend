import {Injectable} from '@angular/core';
import {Observable, Observer, Subject} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private subject: Observable<MessageEvent>;
  private ws: any;

  public get(): Observable<MessageEvent> {
    return this.subject;
  }

  public connect(id: string): Observable<MessageEvent> {
    if (!this.subject) {
      this.subject = this.create(environment.wsUrl + 'kweet/' + id);
    }
    return this.subject;
  }

  private create(url: string): Observable<MessageEvent> {

    this.ws = new WebSocket(url);

    return  Observable.create(
      (obs: Observer<MessageEvent>) => {

        this.ws.onmessage = obs.next.bind(obs);
        this.ws.onerror   = obs.error.bind(obs);
        this.ws.onclose   = obs.complete.bind(obs);

        return this.ws.close.bind(this.ws);

      });

  }

  public close() {
    this.ws.close();
    this.subject = null;
  }

}
