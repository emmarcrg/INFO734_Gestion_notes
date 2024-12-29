import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';  // On fait en sorte de créer un objet d'authentification

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    imports: [CommonModule, FormsModule]
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        console.log('Logged in successfully');
        this.navigateToAcceuil();
      },
      error: (error) => {
        console.error('Error logging in:', error);
        alert('Invalid username or password');
      }
    });
  }

  handleSubmit() {
    console.log('Email:', this.email);
    console.log('Password:', this.password);

  }

  navigateToSignup() {
    this.router.navigate(['/signup']);
  }

  navigateToAcceuil(){
    this.router.navigate(['/acceuil']);
  }
}