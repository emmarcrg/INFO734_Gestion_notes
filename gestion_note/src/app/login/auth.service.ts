import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http : HttpClient) { }
  private apiUrl = 'http://localhost:3000/login'; // URL de votre serveur backend

  login(username: string, password: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(this.apiUrl, { username, password })
      .pipe(
        tap(response => {
          console.log('Login successful', response);
        })
      );
  }
}