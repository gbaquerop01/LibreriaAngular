import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {Usuario} from '../core/models/usuario/Usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usernameSubject: BehaviorSubject<string | null>;
  public username$: Observable<string | null>;

  constructor() {
    const storedUsername = localStorage.getItem('username');
    this.usernameSubject = new BehaviorSubject<string | null>(storedUsername);
    this.username$ = this.usernameSubject.asObservable();
  }

  isLoggedIn(): boolean {
    return this.usernameSubject.value !== null;
  }

  getLoggedInUsername(): string | null {
    return this.usernameSubject.value;
  }

  login(usuario: Usuario): void {
    localStorage.setItem('username', usuario.username);
    localStorage.setItem('role', usuario.role.toString());
    this.usernameSubject.next(usuario.username);
  }

  logout(): void {
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    this.usernameSubject.next(null);
  }

  getLoggedInUser() {
    return this.usernameSubject.value;
  }

  isAdmin() {
    const role = localStorage.getItem('role');
    return role === 'ADMIN';
  }
}
