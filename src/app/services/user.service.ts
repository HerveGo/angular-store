import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: UserModel[] = [];

  urlApi: string = environment.apiUrl;

  constructor(private http:HttpClient) {}

  getAll(): Observable<UserModel[]> {    
    return this.http.get<UserModel[]>(`${this.urlApi}/users`);
  }

  getUser(email: string): Observable<UserModel> {
    return this.http.get<UserModel>(`${this.urlApi}/users/${email}`);
  }

  createUser(user: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(`${this.urlApi}/users`, user);
  }

  deleteUser(email: string): Observable<UserModel> {
    return this.http.delete<UserModel>(`${this.urlApi}/users/${email}`);
  }

}
