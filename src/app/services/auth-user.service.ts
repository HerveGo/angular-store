import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthUser, JWT } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthUserService {

  private apiUrl: string = environment.apiUrl;

  private userSubject: BehaviorSubject<AuthUser | null>;

  constructor(private http: HttpClient) {
    this.userSubject = new BehaviorSubject<AuthUser | null>(null);
    const data = localStorage.getItem("user_auth");

    if( data != undefined) {
      const authUser: AuthUser = JSON.parse(data);
      this.userSubject.next(authUser);
    }
  }

  login(email: string, password: string): Observable<AuthUser> {
    const data = {
      email: email,
      password: password
    }

    return this.http.post<JWT>(`${this.apiUrl}/login`, data)
    .pipe( tap( data => console.log(data)) )
    .pipe( map(  ) );
  }
}
