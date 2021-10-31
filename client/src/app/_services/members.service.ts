import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Member } from '../_modules/member';

const httpOptions = {
  headers: new HttpHeaders({
    Authorization:
      //'Bearer' + JSON.parse(localStorage.getItem('user')).token,
      //gives an error because of nullable type is not assignable to string type. localStorage.getString from null is false.
      //assert is will not be null (one of the two solutions proposed by following link)
      //see https://newbedev.com/argument-of-type-string-null-is-not-assignable-to-parameter-of-type-string-type-null-is-not-assignable-to-type-string-local-storage-code-example
      'Bearer ' + JSON.parse(localStorage.getItem('user')!).token,
  }),
};

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getMembers() {
    return this.http.get<Member[]>(this.baseUrl + 'users', httpOptions);
  }

  getMember(username: string) {
    return this.http.get<Member>(
      this.baseUrl + 'users/' + username,
      httpOptions
    );
  }
}
