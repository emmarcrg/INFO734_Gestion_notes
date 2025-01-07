// src/app/login/login.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule} from '@angular/router';

@Component({
  selector: 'app-saisie_note',
  templateUrl: './saisie_note.component.html',
  styleUrls: ['./saisie_note.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule]
})


export class SaisieComponent {
  semestre_selectionne:number|null=null;
  matiere_selectionnee:string|null=null;
  note:number|null=null;

  // à recup depuis mongo
  matieres_semestre:Record<number, string[]>={
    7: ['MATH741', 'DATA731', 'DATA732', 'INFO734'],
    8: ['DATA831', 'INFO832', 'INFO833', 'ISOC831']
  };

  // import des données saisies dans mongo
  message: string = '';

  // fonction pour sélectionner le semestre
  selectionner_semestre(semestre:number):void{
    this.semestre_selectionne=semestre;
    this.matiere_selectionnee=null;
    this.note=null;
    this.message='';
  }

  recuperer_matieres():string[]{
    if (!this.semestre_selectionne) return [];
    return this.semestre_selectionne ? this.matieres_semestre[this.semestre_selectionne] || [] : [];
  }

  handleSubmit():void{
    if (this.semestre_selectionne && this.matiere_selectionnee && this.note !== null) {
      // Créer un message avec les données saisies
      this.message = `Note saisie avec succès : ${this.note} pour ${this.matiere_selectionnee} au Semestre ${this.semestre_selectionne}`;
    }
    else {
      // Si des informations manquent, afficher un message d'erreur
      this.message = 'Veuillez remplir tous les champs.';
    }
  }
  
}
