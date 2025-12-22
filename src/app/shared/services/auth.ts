import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface AuthResponse {
  accessToken: string;
  user: {
    id: number;
    email: string;
  };
}

@Injectable({
  providedIn: 'root',
})

export class AuthService {

  private apiUrl = 'http://localhost:3000/login';// Базовий URL додастьься через interceptor

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }) {
    return this.http.post<{ accessToken: string }>(this.apiUrl, credentials);
  } // Метод для виконання логіну

  register(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, {
      email,
      password
    });
  }
  saveToken(token: string) {
    localStorage.setItem('jwt_token', token);
  } // Для збереження токену

  getToken(): string | null {
    return localStorage.getItem('jwt_token');
  } // Для отримання токену

  logout() {
    localStorage.removeItem('jwt_token');
  } // Для виконання logOut

  isAuthenticated(): boolean {
    return !!localStorage.getItem('jwt_token');
  } // Для перевірки чи автентифікований користувач
}






