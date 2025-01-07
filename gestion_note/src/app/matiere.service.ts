import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MatiereService {
  private apiUrl = 'http://localhost:4000/api';

  constructor(private http: HttpClient) { }

  getMatieres(semestre: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/matieres/${semestre}`);
  }
}