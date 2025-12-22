import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../shared/services/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean | UrlTree | Observable<boolean | UrlTree> {
    if (this.authService.isAuthenticated()) {
      return true; // Якщо користувач авторизований, то доступ дозволено
    } else {
      alert('You must be logged in to access this page!');
      return this.router.parseUrl('/login'); // Всіх неавторизованих коритувачів перенаправляє на логін
    }
  }
}
