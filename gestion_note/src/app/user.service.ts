import { Injectable } from '@angular/core';
import { User } from './login//user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user: User | null = null;

  setUser(user: User): void {
    this.user = user;
  }

  getUser(): User | null {
    return this.user;
  }

  clearUser(): void {
    this.user = null;
  }
}
