import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service'; // Importe o serviço

import { NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ToastrService } from 'ngx-toastr';
import { catchError, tap } from 'rxjs';
import { of } from 'rxjs';
import { ModalComponent } from '../../shared/modal/modal.component';

@Component({
  selector: 'app-login',
  standalone: true,
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
    private router: Router,
    private toastr: ToastrService
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
          tap(() => {
            this.toastr.success('Login realizado com sucesso!', 'Bem-Vindo!');
            this.closeModal('loginModal');
          }),
          catchError((error) => {
            console.error('Erro no login:', error);
            this.toastr.error(
              error.error?.error || 'Erro no login. Verifique email e senha.',
              'Erro'
            ); // Exibe a mensagem de erro do backend ou uma mensagem genérica
            return of(null); // Retorna um observable vazio para evitar erros subsequentes
          })
        )
        .subscribe();
    }
  }
}
