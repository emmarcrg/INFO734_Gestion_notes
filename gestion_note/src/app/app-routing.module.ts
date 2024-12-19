import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SaisieComponent } from './page_saisie_note/saisie_note.component';

const routes: Routes = [
  { path: '', redirectTo: '/page_saisie_note', pathMatch: 'full' },  // Route par défaut qui redirige vers 'login'
  { path: 'login', component: LoginComponent },  // Route pour la page de connexion
  { path: 'page_saisie_note', component: SaisieComponent },  // Route pour la page de saisie des notes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
