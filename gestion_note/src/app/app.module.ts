import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AccueilComponent } from './page_accueil/accueil/accueil.component';
import { SaisieComponent } from './page_saisie_note/saisie_note.component';
import { AffichageComponent } from './page_affichage_notes/affichage_note.component';
import { provideHttpClient  } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';


@NgModule({

  imports: [BrowserModule, 
    FormsModule,
    AppRoutingModule,
    LoginComponent,
    AccueilComponent,
    LoginComponent,
    AccueilComponent,
    SaisieComponent,
    AffichageComponent,
    AppComponent,
    SignupComponent
  ],   
  providers: [provideHttpClient()],
})
export class AppModule { }
