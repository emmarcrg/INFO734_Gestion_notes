import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [
    LoginComponent,
    AppComponent,
    BrowserModule,
    FormsModule  // Modules à importer
  ],
  providers: [],
//   bootstrap: [AppComponent]
})
export class AppModule { }
