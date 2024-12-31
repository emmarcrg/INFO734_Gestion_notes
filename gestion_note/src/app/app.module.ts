import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AccueilComponent } from './page_accueil/accueil/accueil.component';
import { SaisieComponent } from './page_saisie_note/saisie_note.component';
import { AffichageComponent } from './page_affichage_notes/affichage_note.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  imports: [
    BrowserModule,
    LoginComponent,
    AccueilComponent,
    SaisieComponent,
    AffichageComponent,
    AppComponent,
    FormsModule
  ],
  providers: [],
})
export class AppModule { }
