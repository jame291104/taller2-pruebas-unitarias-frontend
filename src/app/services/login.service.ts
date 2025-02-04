import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // private apiUrl = "http://52.14.132.159:9000/iniciarSesion" // Esto es para AWS
   private apiUrl = "http://137.184.33.89:9000/iniciarSesion"
  private _httpClient = inject(HttpClient);
  private _router = inject(Router);

  login(emailLogin: string, passwordLogin: string){
    // Pasamos URL y cuerpo de la petición
    return this._httpClient.post(this.apiUrl, {emailLogin, passwordLogin})
  }

  getToken() : string | null {
    return localStorage.getItem('token')
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}
