import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  urlApi: string = environment.apiUrl;

  constructor(
    private http:HttpClient
  ) { }

  getAll(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(`${this.urlApi}/users`);
  }
}
