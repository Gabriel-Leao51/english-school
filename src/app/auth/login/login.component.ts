import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service'; // Importe o serviço

import { NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { catchError, tap } from 'rxjs';
import { Observable, of } from 'rxjs';
import { ModalComponent } from '../../shared/modal/modal.component';

@Component({
  selector: 'app-login',
  standalone: true,
  providers: [AuthService],
  imports: [ReactiveFormsModule, NgIf, HttpClientModule, ModalComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  showModal = false;
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  openModal() {
    this.showModal = true; // Apenas altere o estado da modal
  }

  closeModal(modalId: string) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = 'none';
    }
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService
        .login(this.loginForm.value)
        .pipe(
          tap((response) => {
            localStorage.setItem('token', response.token);

            // Redirecionar o usuário para a página inicial
            this.router.navigate(['/']);
          }),
          catchError((error) => {
            this.errorMessage = 'Erro ao fazer login: ' + error.message;
            return of(error); // Propaga o erro como um Observable
          })
        )
        .subscribe();
    }
  }
}
