import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}
  url: string = 'http://localhost:8000/';
  getProfile() {
    return this.http.get(this.url + 'profile');
  }
}
