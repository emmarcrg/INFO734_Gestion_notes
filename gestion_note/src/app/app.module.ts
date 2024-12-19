import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SaisieComponent } from './page_saisie_note/saisie_note.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  imports : [
    LoginComponent,
    AppComponent,
    SaisieComponent,
    BrowserModule,
    AppRoutingModule,
    FormsModule  // Modules à importer
  ],

  providers: [],
  //bootstrap: [AppComponent]
})
export class AppModule { }
