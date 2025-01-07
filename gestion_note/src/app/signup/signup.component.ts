import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  standalone: true,
  imports: [FormsModule] // Importation du module de formulaires ici
})
export class SignupComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private router: Router) {}

  onSignup() {
    if (this.password === this.confirmPassword) {
      console.log('Inscription confirmée');
      this.navigateToAccueil();
    } else {
      console.error('Erreur : Confirmation du mot de passe incorrecte');
      alert('Confirmation du mot de passe invalide');
    }
  }

  navigateToAccueil() {
    this.router.navigate(['/accueil']);
  }
}
