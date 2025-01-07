import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  predefinedUsers: { email: string, password: string }[] = [
    { email: 'axelle@example.com', password: '0000' },
    { email: 'emma@example.com', password: '1234' }
  ];


  constructor(private http : HttpClient) { }
  private apiUrl = 'http://localhost:3000/login'; // URL de votre serveur backend

  login(email: string, password: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(this.apiUrl, { email, password })
      .pipe(
        tap(response => {
          console.log('Login successful', response);
        })
      );
  }
}