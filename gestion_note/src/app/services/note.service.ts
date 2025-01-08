import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private apiUrlNote='http://localhost:4000/notes/';
  private apiUrlEleve='http://localhost:4000/eleves/';
  private apiUrlMatiere='http://localhost:4000/matieres/';
  private apiUrlUE='http://localhost:4000/ues/';
  private apiUrlSemestre='http://localhost:4000/semestres/';

  constructor(private http: HttpClient) {}

  // récupérer les notes d'un élève
  getNotesEleve(id_eleve: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrlNote}/getNotesEleve/${id_eleve}`);
  }

  // ajouter une nouvelle note
  ajouterNote(id_eleve: string, id_matiere: string, note: number, coef: number): Observable<any> {
    const body={id_eleve, id_matiere, note, coef }; 
    return this.http.post<any>(`${this.apiUrlNote}/ajouterNote`, body);
  }


  // récupérer les matières
  getMatieres(id_ue:string): Observable<any> {
    console.log('Appel à l’API pour récupérer les matières :', id_ue);
    return this.http.get<any>(`${this.apiUrlMatiere}/getMatieres/${id_ue}`);
  }

  // récupérer les semestres
  getSemestres(): Observable<any> {
    console.log('Appel à l’API pour récupérer les semestres');
    return this.http.get<any>(`${this.apiUrlSemestre}/getSemestres`);
  }

  // récupérer les UEs
  getUE(id_semestre:string): Observable<any> {
    console.log('Appel à l’API pour récupérer les UEs :', id_semestre);
    return this.http.get<any>(`${this.apiUrlUE}/getUE/${id_semestre}`);
  }

}
