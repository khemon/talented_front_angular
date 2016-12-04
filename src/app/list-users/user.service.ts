/**
 * Created by Khémon on 21/11/2016.
 */
import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from "@angular/http";
import {User} from '../model/user';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/Rx';


@Injectable()
export class UserService {

  private usersUrl = 'app/in-memory-data/users.json'; // URL to web api 'app/users'
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private  http: Http) {}

  getUsers(): Observable<User[]>{

    return this.http.get(this.usersUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }
/*
  getUser(id: number): Observable<User> {
    return this.getUsers().
    subscribe(
      users => users.find(user => user.id === id)
    )
  }*/


  update(user: User): Observable<User> {
    const url = `${this.usersUrl}/${user.id}`;
    return this.http
      .put(url, JSON.stringify(user), {headers: this.headers})
      .map(this.extractData)
      .catch(this.handleError);
  }

  addUser(user: User): Observable<User> {
    let userString = JSON.stringify(user);
    let headers = this.headers;
    let options = new RequestOptions({headers: headers});
    return this.http.post(this.usersUrl, userString, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private deleteUser(username: string): Observable<User> {

    return this.http.delete(`${this.usersUrl}/${username}`)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || { };
  }

  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }


}
