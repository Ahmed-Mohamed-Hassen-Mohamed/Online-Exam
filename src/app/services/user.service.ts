import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}
  url: string = 'https://online-exam-app-p0fn.onrender.com/';
  getProfile() {
    return this.http.get(this.url + 'profile');
  }
}
