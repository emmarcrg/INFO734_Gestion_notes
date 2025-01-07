import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NoteService } from '../services/note.service';

@Component({
  selector: 'app-affichage_note',
  templateUrl: './affichage_note.component.html',
  styleUrls: ['./affichage_note.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule]
})
export class AffichageComponent {
  semestre_selectionne: number | null = null;
  moyenne_eleve: number = 0;
  moyenne_classe: number = 0;
  note_plus_haute: number = 0;
  note_plus_basse: number = 0;
  rang_eleve: number = 1;

  matieres_semestre: any[] = [];
  ues: any[] = [];

  // Injection du service
  constructor(private noteService: NoteService) {}

  // Logique pour la sélection du semestre et la récupération des données
  selectionner_semestre(semestre: number): void {
    this.semestre_selectionne = semestre;
    if (semestre === 7) {
      // Appeler l'API pour récupérer les données du semestre 7
      this.noteService.getNotes('eleveId7').subscribe((data) => {
        this.matieres_semestre = data.matieres; // Assurez-vous que la structure des données correspond à ce que vous attendez
        this.calculer_statistiques();
        this.regrouper_ues();
      });
    } else if (semestre === 8) {
      // Appeler l'API pour récupérer les données du semestre 8
      this.noteService.getNotes('eleveId8').subscribe((data) => {
        this.matieres_semestre = data.matieres;
        this.calculer_statistiques();
        this.regrouper_ues();
      });
    }
  }

  // Calcul des statistiques...
  calculer_statistiques(): void {
    // Votre logique ici
  }

  regrouper_ues(): void {
    // Votre logique ici
  }
}
