// src/app/login/login.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  // constructor(private router:Router){}

  handleSubmit() {
    console.log('Email:', this.email);
    console.log('Password:', this.password);
    // this.router.navigate(['/page_saisie_note']);
  }

  
  //onLogin() {
    // Naviguer vers la page saisie_note
    //this.router.navigate(['/page_saisie_note']);
  //}
}
