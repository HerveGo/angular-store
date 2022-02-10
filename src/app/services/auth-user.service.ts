import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthUser, JWT } from '../models/auth.model';

const KEY_AUTH: string = "store_user_auth";
const KEY_JWT: string = "store_json_web_token";

@Injectable({
  providedIn: 'root'
})
export class AuthUserService {
  private apiUrl: string = environment.apiUrl;
  private userSubject: BehaviorSubject<AuthUser | null>;
  private jwtSubject: BehaviorSubject<JWT | null>;

  /**
   * Vérifie que les données utilisateur et jwt sont dans le local storage.
   * Transmet la valeur lue (ou null) aux observateurs.
   */
  constructor(private http: HttpClient) {
    this.userSubject = new BehaviorSubject<AuthUser | null>(null);
    this.jwtSubject = new BehaviorSubject<JWT | null>(null);
    
    const auth: AuthUser = this.parse(localStorage.getItem(KEY_AUTH));
    const jwt: JWT | null = this.parse(localStorage.getItem(KEY_JWT));

    if (jwt) this.jwtSubject.next(jwt);
    if (auth) this.userSubject.next(auth);
  }

  /**
   * Permet de lire les informations sur l'utilisateur actuel
   */
  get user(): AuthUser | null {
    return this.userSubject.value;
  }

  /**
   * Permet de récupérer le jwt, notamment par HttpInterceptor
   */
  get jwt(): JWT | null {
    return this.jwtSubject.value;
  }

  /**
   * Assure que les variables sont initialisées
   */
  init(): void {
    if (!this.jwt) {
      const jwt: JWT | null = this.parse(localStorage.getItem(KEY_JWT));
      if (jwt) this.jwtSubject.next(jwt);
    }
    if (!this.user) {
      const authUser: AuthUser = this.parse(localStorage.getItem(KEY_AUTH));
      if (authUser) this.userSubject.next(authUser);
    }
  }

  /**
   * Retourne le jeton lu dans le local storage.
   * @returns le jeton, ou null si l'utilisateur n'est pas identifié.
   */
  getToken(): JWT | null {
    const data = localStorage.getItem(KEY_JWT);
    if( data ) {
      return JSON.parse(data);
    } else {
      return null;
    }
    
  }

  //login: admin@example.com & password: 0000
  /**
   * Envoie une requête HTTP de type POST pou vérifier si email/password
   * sont corrects. 
   * @param email 
   * @param password 
   * @returns un observable sur l'utilisateur
   */
  login(email: string, password: string): Observable<AuthUser | null> {
    const data = {
      email: email,
      password: password
    }

    return this.http.post<JWT>(`${this.apiUrl}/login`, data)
    .pipe(tap(data => console.log(data)))
    .pipe(map(data => this.decodeResponse(data)));
  }

  /**
   * Décode la réponse du serveur
   * @param data la réponse encodée base64 du serveur
   * @returns 
   */
  private decodeResponse(data: JWT): AuthUser | null {
    const jwt: JWT = Object.assign(new JWT(), data);
    const authUser: AuthUser | null = jwt.getAuthUser();
    if (authUser) {
      localStorage.setItem(KEY_AUTH, JSON.stringify(authUser));
      localStorage.setItem(KEY_JWT, JSON.stringify(jwt));
      return authUser;
    } else {
      this.logOut();
      return null;
    }
  }

  /**
   * Efface les données du local storage.
   * Notifie aux observateurs la déconnexion en envoyant la valeur null.
   */
  logOut(): void {
    localStorage.removeItem(KEY_AUTH);
    localStorage.removeItem(KEY_JWT);

    this.userSubject.next(null);
    this.jwtSubject.next(null);
  }

  /**
   * Parse de manière sécurisée
   * @param json chaîne lue dans le local storage
   * @returns le parse du json
   */
  private parse(json: any): any {
    let data: any;

    try {
      data = JSON.parse(json);
    } catch (error) {
      data = null;
    }

    return data;
  }
}
