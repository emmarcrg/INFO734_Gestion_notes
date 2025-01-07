import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private apiUrlNote='http://localhost:4000/notes/getNotesEleve';

  constructor(private http: HttpClient) {}

  // récupérer les notes d'un élève
  getNotesEleve(id_eleve: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrlNote}/${id_eleve}`);
  }

  // ajouter une nouvelle note
  ajouterNote(id_eleve: string, id_matiere: string, note: number, coef: number): Observable<any> {
    const body={id_eleve, id_matiere, note, coef }; 
    return this.http.post<any>(`${this.apiUrlNote}/ajouterNote`, body); // Requête POST pour ajouter la note
  }

  // récupérer les matières
  getMatieres(): Observable<any> {
    return this.http.get<any>(`${this.apiUrlNote}/getMatieres`);
  }

}
