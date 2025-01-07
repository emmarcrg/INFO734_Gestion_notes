import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';  // On fait en sorte de créer un objet d'authentification

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

  predefinedUsers: { email: string, password: string }[] = [
    { email: 'axelle@example.com', password: '0000' },
    { email: 'emma@example.com', password: '1234' }
  ];

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
   
    const user = this.predefinedUsers.find(user => user.email === this.email && user.password === this.password);
    if(user) {
      //this.authService.login(this.email, this.password).subscribe({
        //next: () => {

          //console.log('Logged in successfully');
          this.navigateToAcceuil();
        //},
        //error: (error) => {
        //  console.error('Error logging in:', error);
          //alert('Invalid username or password');
        //}
      //});
    }else {
      alert('Invalid username or password');
    }
  }

  navigateToSignup() {
    this.router.navigate(['/signup']);
  }

  navigateToAcceuil(){
    this.router.navigate(['/accueil']);
  }
}