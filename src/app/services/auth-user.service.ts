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

  private lsAuthUser:string = "user_auth";
  private lsJwt:string = "jwt_token";

  constructor(private http: HttpClient) {
    this.userSubject = new BehaviorSubject<AuthUser | null>(null);
    
    const data = localStorage.getItem(this.lsAuthUser);

    if( data != undefined) {
      console.log("Vous êtes déjà identifié");
      
      const authUser: AuthUser = JSON.parse(data);
      this.userSubject.next(authUser);
    }
  }

  get user(): AuthUser | null {
    return this.userSubject.value;
  }

  getToken(): JWT | null {
    const data = localStorage.getItem(this.lsJwt);
    if( data ) {
      return JSON.parse(data);
    } else {
      return null;
    }
    
  }

  //login: admin@example.com & password: 0000
  login(email: string, password: string): Observable<AuthUser | null> {
    const data = {
      email: email,
      password: password
    }

    return this.http.post<JWT>(`${this.apiUrl}/login`, data)
    .pipe( tap( data => console.log(data)) )
    .pipe( map( (data) => this.logIn(data) ) );
  }

  logIn(data: JWT): AuthUser | null {
    const jwt: JWT = new JWT();
    Object.assign(jwt, data);
  
    const user: AuthUser | null = jwt.getAuthUser();
    if (user) {
      localStorage.setItem(this.lsAuthUser, JSON.stringify(user));
      localStorage.setItem(this.lsJwt, JSON.stringify(jwt));
      return user;
    } else {
      this.logOut();
      return null;
    }
  }

  logOut(): void {
    localStorage.removeItem(this.lsAuthUser);
    localStorage.removeItem(this.lsJwt);
    this.userSubject.next(null);
  }
}
