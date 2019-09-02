import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { baseURL } from '../globals';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseURL = baseURL;
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(`${this.baseURL}/api/users`);
  }

  getUserByName(username: string) {
    return this.http.get(`${this.baseURL}/api/user/${username}`);
  }

  update(user: User) {
    return this.http.put(`${this.baseURL}/api/user/${user.username}`, user);
  }

  creat(user: User) {
    return this.http.post(`${this.baseURL}/api/user`, user);
  }

  delete(username: string) {
    return this.http.delete(`${this.baseURL}/api/user/${username}`);
  }
}

