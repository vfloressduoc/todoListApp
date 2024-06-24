import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;

  login(username: string, password: string): boolean {
    // lógica de autenticación
    this.isAuthenticated = true; // cambiar según sea necesario
    return this.isAuthenticated;
  }

  logout(): void {
    this.isAuthenticated = false;
  }

  isAuthenticated(): boolean {
    return this.isAuthenticated;
  }
}
