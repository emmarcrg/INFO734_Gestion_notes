import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NoteService } from '../services/note.service';

interface Matiere {
  nom: string;
  _id: string;
}

interface UE {
  _id: string;
  nom: string;
  coef: number;
  id_matiere: string;
}

interface Semestre {
  code: string;
  nom: string;
  id_ue: string[];
}

@Component({
  selector: 'app-saisie_note',
  templateUrl: './saisie_note.component.html',
  styleUrls: ['./saisie_note.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
})
export class SaisieComponent implements OnInit {
  semestre_selectionne: string | null = null; // On sélectionne un semestre par son code
  matiere_selectionnee: string | null = null;
  note: number | null = null;

  matieres: Matiere[] = []; // Liste de toutes les matières
  ues: UE[] = []; // Liste de toutes les unités d'enseignement
  semestres: Semestre[] = []; // Liste des semestres avec leurs unités
  message: string = '';

  constructor(private noteService: NoteService) {}

  ngOnInit(): void {
    // Charger les semestres, UE et matières depuis l'API
    this.noteService.getMatieres().subscribe(
      (data: { semestres: Semestre[]; ues: UE[]; matieres: Matiere[] }) => {
        this.semestres = data.semestres;
        this.ues = data.ues;
        this.matieres = data.matieres;
      },
      (error) => {
        console.error('Erreur lors du chargement des données :', error);
        this.message = "Erreur lors du chargement des données.";
      }
    );
  }

  selectionner_semestre(semestre: string): void {
    this.semestre_selectionne = semestre;
    this.matiere_selectionnee = null;
    this.note = null;
    this.message = '';
  }

  recuperer_matieres(): Matiere[] {
    if (!this.semestre_selectionne) return [];

    // Trouver le semestre sélectionné
    const semestre = this.semestres.find((s) => s.code === this.semestre_selectionne);
    if (!semestre) return [];

    // Récupérer les UEs du semestre
    const ues_du_semestre = this.ues.filter((ue) => semestre.id_ue.includes(ue._id));

    // Récupérer les matières liées aux UEs
    const matieres_ids = ues_du_semestre.map((ue) => ue.id_matiere);
    return this.matieres.filter((matiere) => matieres_ids.includes(matiere._id));
  }

  handleSubmit(): void {
    if (this.semestre_selectionne && this.matiere_selectionnee && this.note !== null) {
      const id_eleve = "6763e0dc447b0bff6457cc2f"; // Exemple d'id élève
      const matiere = this.matieres.find(
        (m) => m._id === this.matiere_selectionnee
      );

      if (!matiere) {
        this.message = 'Matière sélectionnée invalide.';
        return;
      }

      const ue = this.ues.find((ue) => ue.id_matiere === matiere._id);
      const coef = ue ? ue.coef : 1; // Récupérer le coefficient depuis l'UE

      // Appeler la méthode du service pour ajouter la note
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
