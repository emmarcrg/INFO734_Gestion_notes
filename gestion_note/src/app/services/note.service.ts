import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private baseUrl = 'http://localhost:4000/api';

  constructor(private http: HttpClient) {}

  getNotes(eleveId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/notes/${eleveId}`);
  }
}
