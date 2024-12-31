// src/app/services/note.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', // Cela permet d'enregistrer le service au niveau de l'application
})
export class NoteService {

  private apiUrl = 'http://localhost:4000/api/notes'; // URL de votre API

  constructor(private http: HttpClient) {}

  // Exemple de méthode pour récupérer les notes d'un élève
  getNotes(eleveId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${eleveId}`);
  }

  // Autres méthodes pour interagir avec l'API...
}
