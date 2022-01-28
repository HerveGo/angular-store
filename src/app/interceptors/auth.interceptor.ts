import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthUserService } from '../services/auth-user.service';
import { JWT } from '../models/auth.model';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthUserService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const jwt: JWT | null = this.authService.getToken();

    if( jwt ) {
      const req = request.clone({
        setHeaders: {
          Authorization: `bearer ${jwt.token}`
        }
      });
      return next.handle(req);
    }
    return next.handle(request);
  }
}
