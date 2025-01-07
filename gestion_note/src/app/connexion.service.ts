import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConnexionService {
  private apiUrl = 'http://localhost:4000/api';

  constructor(private http: HttpClient) { }

  getPersonnes(): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/connexion/`).pipe(
      map(matieres => matieres.map(matiere => ({
        id: matiere.id,
        nom: matiere.nom,
        prenom: matiere.prenom,
        login: matiere.login,
        mdp_crypte: matiere.mdp_crypte
      })))
    );
  }
  authenticate(login: string, password: string): Observable<any> { 
    return this.http.post<any>(`${this.apiUrl}/auth`, { login, password }); 
  }

}
