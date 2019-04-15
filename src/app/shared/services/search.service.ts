import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user';
import {map} from 'rxjs/operators';
import {Kweet} from '../models/kweet';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private apiUrl = 'http://192.168.178.157:8080/kwetter-1.0/api/search';

  constructor(
    private http: HttpClient,
  ) { }

  search(term: string): Observable<any> {
    const url = `${this.apiUrl}/${term}`;
    return this.http.get<any[]>(url)
      .pipe(
        map(result => {
          const users = {
            type: 'users',
            children: []
          };
          const kweets = {
            type: 'kweets',
            children: [],
          };

          result.forEach(r => {

            switch (r.type) {
              case 'user':
                users.children.push(r.model as User);
                break;
              case 'kweet':
                kweets.children.push(r.model as Kweet);
                break;

            }
          });

          return {
            users,
            kweets
          };
        })
      );

  }

}
