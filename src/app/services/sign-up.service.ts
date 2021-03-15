import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class SignUpService {
  usersUrl:string = 'https://signupformang.herokuapp.com/users';
  _users = []


  constructor(private http:HttpClient) { }

  addANewUser(user): Observable<any> {
    return this.http.post(this.usersUrl, user, httpOptions)
  }

  getUsers(): Observable<any> {
    return this.http.get<any>(this.usersUrl);
  }

  deleteAUser(id): Observable<any> {
    const deleteURL = `${this.usersUrl}/${id}`
    return this.http.delete<any>(deleteURL, httpOptions)
  }
}
