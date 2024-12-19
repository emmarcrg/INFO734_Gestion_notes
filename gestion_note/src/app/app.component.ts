import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { SaisieComponent } from './page_saisie_note/saisie_note.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, LoginComponent, SaisieComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent {
  email: string = '';
  password: string = '';

  handleSubmit() {
    console.log('Email:', this.email);
    console.log('Password:', this.password);
  }
}
