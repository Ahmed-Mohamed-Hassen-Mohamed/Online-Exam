import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url: string = 'https://online-exam-app-p0fn.onrender.com/';
  constructor(private http: HttpClient) {}
  signup(body: any) {
    return this.http.post(this.url + 'signup', body);
  }
  login(body: any) {
    return this.http.post(this.url + 'signin', body);
  }
  sendEmail(email: any) {
    return this.http.post(this.url + 'sendEmail', { email });
  }
  updatePassword(user: any) {
    return this.http.patch(this.url + 'updatePassword', user);
  }
}
