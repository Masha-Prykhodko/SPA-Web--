import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth';
import { RouterLink} from "@angular/router";

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  }); // Для заповнення форми даними

  constructor(private authService: AuthService) {
  }

  onSubmit() {
      if (this.loginForm.valid) {
        const credentials = this.loginForm.getRawValue();
        this.authService.login({
          email: credentials.email!,
          password: credentials.password!
        }).subscribe({
          next: (res) => {
            this.authService.saveToken(res.accessToken);
            console.log('✅ Token saved');
            console.log('✅ Login data:', this.loginForm.value);
          },
          error: () => {
            console.log('❌ Login failed');
          } // Перевірка помилок при підтвердженні даних форми
        });
      }
  }
}








