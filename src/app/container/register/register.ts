import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../shared/services/auth';
import { RouterLink} from "@angular/router";

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  constructor(private authService: AuthService) {}

  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
  });// Форма для заповнення даних реєстрації

  onSubmit() {
    if (this.registerForm.valid) {
      console.log('✅ Register data:', this.registerForm.value);
    } else {
      this.registerForm.markAllAsTouched();
    }// Обробка помилок при підтвердженні форми
  }
}

