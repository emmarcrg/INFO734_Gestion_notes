import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AccueilComponent } from './page_accueil/accueil/accueil.component';
import { SaisieComponent } from './page_saisie_note/saisie_note.component';
import { AffichageComponent } from './page_affichage_notes/affichage_note.component';
import { SignupComponent } from './signup/signup.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },  // Route par défaut
  { path: 'login', component: LoginComponent },  // Route pour la page de connexion
  { path: 'accueil', component: AccueilComponent }, // Route pour la page d'accueil
  { path: 'page_saisie_note', component: SaisieComponent },  // Route pour la page de saisie des notes
  { path: 'page_affichage_notes', component: AffichageComponent },  // Route pour l'affichage des notes
  { path : 'signup', component: SignupComponent}
];


