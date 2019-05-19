import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user';
import {map} from 'rxjs/operators';
import {Kweet} from '../models/kweet';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private apiUrl = '/search';

  constructor(
    private http: HttpClient,
  ) {
    this.apiUrl = environment.apiUrl + this.apiUrl;
  }

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
