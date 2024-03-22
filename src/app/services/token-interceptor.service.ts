import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService {
  constructor() {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    const newReq = req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + token,
      },
    });
    return next.handle(newReq);
  }
}
