import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseURL = 'http://localhost:3000';
  constructor(private http:HttpClient) { }

  login (username: string,password: string): Observable<IUserAuthData> {
    return this.http.post<IUserAuthData>(this.baseURL + '/api/auth', {username,password});
  }
  logout(): void{
    return sessionStorage.removeItem('currentUser');
  }
}

interface IUserAuthData{
  username: string;
  password: string;
}
