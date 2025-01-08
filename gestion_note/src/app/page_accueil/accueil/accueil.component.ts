import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../user.service'; // Chemin relatif vers le service UserService
import { User } from '../../login/user'; // Chemin relatif vers l'interface User

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css'],
})
export class AccueilComponent {
  user: User | null = null;

  constructor(private userService: UserService, private router : Router) {
    this.user = this.userService.getUser();
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
