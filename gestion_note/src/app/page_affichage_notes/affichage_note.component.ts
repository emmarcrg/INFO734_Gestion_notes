// src/app/login/login.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Matiere {
  nom: string;
  note_eleve: number;
  moyenne_classe: number;
  note_max: number;
  note_min: number;
  rang_eleve: number;
  ue: string;
}

interface UE {
  nom: string;
  matieres: Matiere[];
  moyenne_UE: number;
  moyenne_classe_UE: number;
  note_max_ue: number;
  note_min_ue: number;
  rang_eleve_ue: number;
}

@Component({
  selector: 'app-affichage_note',
  templateUrl: './affichage_note.component.html',
  styleUrls: ['./affichage_note.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})

export class AffichageComponent {
  semestre_selectionne:number|null=null;
  moyenne_eleve:number=0;
  moyenne_classe:number=0;
  note_plus_haute:number=0;
  note_plus_basse:number=0;
  rang_eleve: number=1;

  matieres_semestre:Matiere[]=[];
  ues:UE[]=[];

  // import des données saisies dans mongo
  message: string='';

  // fonction pour sélectionner le semestre
  selectionner_semestre(semestre:number):void{
    this.semestre_selectionne=semestre;
     // données à récupérer depuis mongo
     if (semestre===7) { 
      this.matieres_semestre=[
        { nom: 'MATH741', note_eleve: 15, moyenne_classe: 12, note_max: 18, note_min: 8, rang_eleve: 1, ue:"UE702"},
        { nom: 'DATA731', note_eleve: 14, moyenne_classe: 13, note_max: 17, note_min: 9, rang_eleve: 2, ue:"UE702"},
        { nom: 'DATA732', note_eleve: 16, moyenne_classe: 14, note_max: 20, note_min: 10, rang_eleve: 1, ue:"UE703"},
        { nom: 'INFO743', note_eleve: 11, moyenne_classe: 9, note_max: 18, note_min: 3, rang_eleve: 6, ue:"UE704"}
      ];
      // Calculer les valeurs globales pour l'élève et la classe
      this.calculer_statistiques();
      this.regrouper_ues();
    }
    else if (semestre===8) {
      this.matieres_semestre=[
        { nom: 'DATA831', note_eleve: 18, moyenne_classe: 15, note_max: 19, note_min: 12, rang_eleve: 1, ue:"UE802"},
        { nom: 'INFO832', note_eleve: 16, moyenne_classe: 14, note_max: 18, note_min: 10, rang_eleve: 2, ue:"UE802"},
        { nom: 'ISOC831', note_eleve: 17, moyenne_classe: 16, note_max: 20, note_min: 13, rang_eleve: 2, ue:"UE803"},
        { nom: 'INFO833', note_eleve: 11, moyenne_classe: 9, note_max: 18, note_min: 3, rang_eleve: 6, ue:"UE804"}
      ];
      this.calculer_statistiques();
      this.regrouper_ues();
    }

  }

  calculer_statistiques():void{
    let total_eleve=0;
    let total_classe=0;
    let notes_classe:number[]=[];
    let note_max=-Infinity;
    let note_min=Infinity;

    for (let matiere of this.matieres_semestre) {
      total_eleve+=matiere.note_eleve;
      total_classe+=matiere.moyenne_classe;
      notes_classe.push(matiere.note_max, matiere.note_min);
      note_max=Math.max(note_max, matiere.note_max);
      note_min=Math.min(note_min, matiere.note_min);
    }

    // Calcul de la moyenne pour l'élève et la classe
    this.moyenne_eleve=total_eleve/this.matieres_semestre.length;
    this.moyenne_classe=total_classe/this.matieres_semestre.length;
    this.note_plus_haute=note_max;
    this.note_plus_basse=note_min;
  }

  regrouper_ues(): void {
    const uesMap:{[key:string]:UE}={};
    for (let matiere of this.matieres_semestre) {
      if (!uesMap[matiere.ue]){
        uesMap[matiere.ue]={nom:matiere.ue, matieres:[], moyenne_UE:0, moyenne_classe_UE:0, note_max_ue:-Infinity, note_min_ue:+Infinity, rang_eleve_ue:1};
      }
      uesMap[matiere.ue].matieres.push(matiere);
    }

    // moyenne pour chaque UE
    for (let ueNom in uesMap) {
      const ue=uesMap[ueNom];
      let total_moyenne_eleve=0;
      let total_moyenne_classe=0;
      let rangs:number[]=[];

      for (let matiere of ue.matieres) {
        total_moyenne_eleve+=matiere.note_eleve;
        total_moyenne_classe+=matiere.moyenne_classe;

        ue.note_max_ue = Math.max(ue.note_max_ue, matiere.note_max);
        ue.note_min_ue = Math.min(ue.note_min_ue, matiere.note_min);

        rangs.push(matiere.note_eleve);

      }

      ue.moyenne_UE=total_moyenne_eleve / ue.matieres.length;
      ue.moyenne_classe_UE=total_moyenne_classe / ue.matieres.length;

      // calcul du rang :
      rangs.sort((a, b) => b - a); // Trier les notes par ordre décroissant
      const rangIndex = rangs.indexOf(ue.matieres[0].note_eleve); // Trouver l'index de la note de l'élève
      ue.rang_eleve_ue = rangIndex + 1; // Le rang est l'index + 1
    }

    this.ues=Object.values(uesMap); // Assigner les UEs au tableau ues
  }

  
}
