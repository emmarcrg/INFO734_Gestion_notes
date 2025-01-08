import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NoteService } from '../services/note.service';
import { UserService } from '../user.service';
import { User } from '../login/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-affichage_note',
  templateUrl: './affichage_note.component.html',
  styleUrls: ['./affichage_note.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
})
export class AffichageComponent {
  semestre_selectionne: number | null = null;
  moyenne_eleve: number = 0;
  moyenne_classe: number = 0;
  note_plus_haute: number = 0;
  note_plus_basse: number = 0;
  rang_eleve: number = 1;
  user: User | null = null;

  matieres_semestre: any[] = [];
  ues: any[] = [];
  id_eleve: string = '6763e0dc447b0bff6457cc2f'; // Exemple d'ID élève

 
  constructor(private userService: UserService, private router : Router, private noteService: NoteService) {
    this.user = this.userService.getUser();
  }
  selectionner_semestre(semestre: number): void {
    this.semestre_selectionne = semestre;

    this.noteService.getNotesEleve(this.id_eleve).subscribe(
      (data) => {
        this.matieres_semestre = data.matieres || [];
        this.calculer_statistiques();
        this.regrouper_ues();
      },
      (error) => {
        console.error('Erreur lors de la récupération des notes :', error);
      }
    );
  }

  calculer_statistiques(): void {
    if (this.matieres_semestre.length > 0) {
      const notes = this.matieres_semestre.map((m: any) => m.note);
      this.moyenne_eleve =
        notes.reduce((sum: number, n: number) => sum + n, 0) / notes.length;
      this.note_plus_haute = Math.max(...notes);
      this.note_plus_basse = Math.min(...notes);
    }
  }

  regrouper_ues(): void {
    this.ues = this.matieres_semestre.reduce((grouped: any[], matiere: any) => {
      const ue = grouped.find((u: any) => u.nom === matiere.ue_nom);
      if (!ue) {
        grouped.push({
          nom: matiere.ue_nom,
          coef: matiere.coef,
          matieres: [matiere],
        });
      } else {
        ue.matieres.push(matiere);
      }
      return grouped;
    }, []);
  }
  
    navigateToSaisieNote() {
      this.router.navigate(['/page_saisie_note']);
    }
  
    navigateToAffichageNote() {
      this.router.navigate(['/page_affichage_notes']);
    }
  
    navigateToAccueil() {
      this.router.navigate(['/accueil']);
    }
}
