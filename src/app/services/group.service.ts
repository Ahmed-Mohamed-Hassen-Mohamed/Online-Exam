import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  constructor(private http: HttpClient) {}
  url: string = 'http://localhost:8000/';

  addGroup(group: any) {
    return this.http.post(this.url + 'group', group);
  }
  getMyGroups() {
    return this.http.get(this.url + 'groups');
  }
  getGroup(id: any) {
    return this.http.get(this.url + 'groups/' + id);
  }
  getMembers(id: any) {
    return this.http.get(this.url + 'members/' + id);
  }
  updateGroup(id: any, group: any) {
    return this.http.patch(this.url + 'groups/' + id, group);
  }
  deleteGroup(id: any) {
    return this.http.delete(this.url + 'groups/' + id);
  }
  joinGroup(group: any) {
    return this.http.post(this.url + 'join', group);
  }
  getGroups() {
    return this.http.get(this.url + 'joins');
  }
  getJoin(id: any) {
    return this.http.get(this.url + 'Joins/' + id);
  }
  deleteJoin(id: any) {
    return this.http.delete(this.url + 'joins/' + id);
  }
}
