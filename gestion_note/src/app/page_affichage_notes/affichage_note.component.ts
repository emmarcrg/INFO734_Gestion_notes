import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NoteService } from '../services/note.service';
import { forkJoin, Observable } from 'rxjs';

interface Matiere {
  _id: string;
  nom: string;
  code: string;
}

interface Note {
  id_matiere: Matiere;
  note_eleve: number;
}

interface UE {
  _id: string;
  nom: string;
  code: string;
  matieres: Matiere[];
}

interface Semestre {
  _id: string;
  code: string;
  nom: string;
}

@Component({
  selector: 'app-affichage-note',
  templateUrl: './affichage_note.component.html',
  styleUrls: ['./affichage_note.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
})
export class AffichageComponent implements OnInit {
  id_eleve: string = '6763e0dc447b0bff6457cc2f'; // Exemple d'ID élève
  semestres: Semestre[] = []; // Liste des semestres disponibles
  ues: UE[] = []; // UEs du semestre sélectionné
  matieres: Matiere[] = []; // Matières du semestre sélectionné
  notes_eleve: Note[] = []; // Toutes les notes de l'élève

  matieres_semestre: { matiere: Matiere; note: Note | null }[] = []; // Matières et leurs notes
  semestre_selectionne: Semestre | null = null; // Semestre sélectionné

  moyenne_eleve: number = 0; // Moyenne générale de l'élève
  note_plus_haute: number = 0; // Note la plus haute
  note_plus_basse: number = 0; // Note la plus basse

  constructor(private noteService: NoteService) {}

  ngOnInit(): void {
    this.chargerSemestres();
    this.chargerNotesEleve();
  }

  // Charger les semestres
  chargerSemestres(): void {
    this.noteService.getSemestres().subscribe(
      (semestres: Semestre[]) => {
        this.semestres = semestres;
        console.log('Semestres récupérés :', this.semestres);
      },
      (error) => {
        console.error('Erreur lors du chargement des semestres :', error);
      }
    );
  }

  // Charger les notes de l'élève
  chargerNotesEleve(): void {
    this.noteService.getNotesEleve(this.id_eleve).subscribe(
      (notes: Note[]) => {
        this.notes_eleve = notes;
        console.log('Notes récupérées :', this.notes_eleve);
      },
      (error) => {
        console.error('Erreur lors du chargement des notes :', error);
      }
    );
  }

  // Charger les UEs et les matières pour un semestre donné
  chargerUesEtMatieres(id_semestre: string): void {
    console.log('Chargement des UEs et matières du semestre :', id_semestre);
    this.noteService.getUE(id_semestre).subscribe(
      (ues: UE[]) => {
        this.ues = ues;

        // Obtenir les matières pour chaque UE
        const matiereObservables: Observable<Matiere[]>[] = ues.map((ue) =>
          this.noteService.getMatieres(ue._id)
        );

        forkJoin(matiereObservables).subscribe(
          (matieresParUe: Matiere[][]) => {
            this.matieres = matieresParUe.flat(); // Combine toutes les matières
            console.log('Matières récupérées:', this.matieres);

            this.lierNotesAuxMatieres();
            this.calculerStatistiques();
          },
          (error) => {
            console.error('Erreur lors du chargement des matières :', error);
          }
        );
      },
      (error) => {
        console.error('Erreur lors du chargement des UEs :', error);
      }
    );
  }

  // Sélectionner un semestre et charger les données associées
  selectionnerSemestre(semestreCode: string): void {
    const semestre = this.semestres.find((s) => s.code === semestreCode);
    if (!semestre) {
      console.error('Semestre non trouvé :', semestreCode);
      return;
    }
    console.log('Semestre sélectionné:', semestre);
    this.semestre_selectionne = semestre;

    // Charger les données du semestre sélectionné
    this.chargerUesEtMatieres(semestre._id);
  }

  lierNotesAuxMatieres(): void {
    console.log("Lien entre les notes et les matières en")
    this.matieres_semestre = this.matieres.map((matiere) => {
      const note = this.notes_eleve.find((n) => 
        n.id_matiere && n.id_matiere._id === matiere._id
      );
      console.log(
        `Lien matière-note: matiere._id=${matiere._id}, note=${note ? note.note_eleve : 'Aucune'}`
      );
      return { matiere, note: note || null };
    });
  }

  // Calculer les statistiques des notes
  calculerStatistiques(): void {
    const notesValides = this.matieres_semestre
      .filter((entry) => entry.note !== null)
      .map((entry) => entry.note!.note_eleve);

    if (notesValides.length > 0) {
      this.moyenne_eleve =
        notesValides.reduce((sum, note) => sum + note, 0) / notesValides.length;
      this.note_plus_haute = Math.max(...notesValides);
      this.note_plus_basse = Math.min(...notesValides);
    } else {
      this.moyenne_eleve = 0;
      this.note_plus_haute = 0;
      this.note_plus_basse = 0;
    }
  }
}
