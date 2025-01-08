import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ConnexionService } from '../connexion.service';  
import { User } from './user';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    standalone : true,
    imports: [CommonModule, FormsModule]
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private connexionService: ConnexionService, private router: Router) {}

  onLogin() {
    this.connexionService.getPersonneByLogin(this.email).subscribe({
      next: (response) => {
        console.log('Logged in successfully:', response);
        //On enregistre un objet de type user lors de la connexion => garder en mémoire la personne connectée
        const user: User = { 
          identifiant: response.user._id, 
          nom: response.user.nom,
          prenom: response.user.prenom,
          semestre: '0' };
        console.log('La personne ' + user.nom + ' ' +user.prenom + ' est connectée');
        this.navigateToAcceuil();
      },
      error: (error) => {
        console.error('Error logging in:', error);
        alert('Invalid username or password');
      }
    });
  }

  navigateToSignup() {
    this.router.navigate(['/signup']);
  }

  navigateToAcceuil(){
    
    this.router.navigate(['/accueil']);
  }
}
