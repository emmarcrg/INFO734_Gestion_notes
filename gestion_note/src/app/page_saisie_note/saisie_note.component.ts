import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NoteService } from '../services/note.service';
import { forkJoin } from 'rxjs'; // pour attendre que toutes les requêtes API soient faites

interface Matiere {
  _id: string;
  code: string;
  nom: string;
  id_ue: string;
}

interface UE {
  _id: string;
  code: string;
  nom: string;
  coef: number;
  id_semestre: string;
}

interface Semestre {
  _id: string;
  code: string;
  nom: string;
}

@Component({
  selector: 'app-saisie_note',
  templateUrl: './saisie_note.component.html',
  styleUrls: ['./saisie_note.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
})
export class SaisieComponent implements OnInit {
  semestre_selectionne: string | null = null; // on affiche les codes des semestres
  matiere_selectionnee: string | null = null;
  note: number | null = null;

  matieres: Matiere[] = [];
  ues: UE[] = [];
  semestres: Semestre[] = [];
  message: string = '';

  constructor(private noteService: NoteService) {
    console.log('NoteService chargé.');
  }

  ngOnInit(): void {
    this.charger_semestres();
  }

  charger_semestres(): void {
    this.noteService.getSemestres().subscribe(
      (semestres: Semestre[]) => {
        this.semestres = semestres;
      },
      (error) => {
        console.error('Erreur lors du chargement des semestres :', error);
        this.message = 'Erreur lors du chargement des semestres.';
      }
    );
  }

  charger_ues_matieres(semestre: string): void {
    console.log('Semestre sélectionné :', semestre);
    this.semestre_selectionne = semestre;
    // on récupère les UEs du semestre sélectionné
    const semestre_selectionne = this.semestres.find((s) => s.code === semestre);
    if (!semestre_selectionne) {
      this.message = 'Semestre non trouvé.';
      return;
    }

    // on récupère l'id du semestre
    const id_semestre = semestre_selectionne._id;

    // on récupère la liste des ues depuis l'API
    this.noteService.getUE(id_semestre).subscribe(
      (ues: UE[]) => {
        if (ues.length === 0) {
          this.message = 'Aucune UE trouvée pour l\'id semestre spécifié.';
          console.log("Aucune UE trouvée pour le semestre :", semestre_selectionne.code);
          return;
        }

        const matiereObservables = ues.map((ue: UE) =>
          this.noteService.getMatieres(ue._id)
        );

        forkJoin(matiereObservables).subscribe(
          (results: Matiere[][]) => {
            // Combinez toutes les matières
            this.matieres = results.flat();
            console.log('Matières mises à jour :', this.matieres);
          },
          (error) => {
            console.error('Erreur lors de la récupération des matières :', error);
            this.message = 'Erreur lors de la récupération des matières.';
          }
        );
      },
      (error) => {
        console.error('Erreur lors de la récupération des UEs :', error);
        this.message = 'Erreur lors de la récupération des UEs.';
      }
  );
}

  handleSubmit(): void {
    if (this.semestre_selectionne && this.matiere_selectionnee && this.note !== null) {
      const id_eleve = '6763e0dc447b0bff6457cc2f'; // à récupérer depuis la page de connexion
      const matiere = this.matieres.find((m) => m._id === this.matiere_selectionnee);

      if (!matiere) {
        this.message = 'Matière sélectionnée invalide.';
        return;
      }

      const coef = 1; // voir si on permet de modifier le coef depuis le formulaire plus tard

      // on ajoute la note au serveur via l'API
      this.noteService.ajouterNote(id_eleve, matiere._id, this.note, coef).subscribe(
        (response: any) => {
          this.message = `Note de ${response.note} pour ${response.matiere.nom} ajoutée avec succès !`;
        },
        (error) => {
          this.message = 'Erreur lors de l’ajout de la note.';
          console.error("Erreur lors de l'ajout de la note :", error);
        }
      );
    } else {
      this.message = 'Veuillez remplir tous les champs.';
    }
  }
}
