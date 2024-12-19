import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>('/login', { username, password })
      .pipe(
        tap(response => {
          console.log('Login successful', response);
        })
      );
  }
}