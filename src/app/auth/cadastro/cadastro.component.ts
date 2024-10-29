import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service'; // Importe o serviço

import { NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { catchError, tap } from 'rxjs';
import { Observable, of } from 'rxjs';
import { ModalComponent } from '../../shared/modal/modal.component';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  providers: [AuthService],
  imports: [ReactiveFormsModule, NgIf, HttpClientModule, ModalComponent],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
})
export class CadastroComponent {
  showModal = false;
  cadastroForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.cadastroForm = this.fb.group({
      name: ['', Validators.required],
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
    if (this.cadastroForm.valid) {
      console.log(this.cadastroForm.value);
      this.authService
        .cadastrar(this.cadastroForm.value)
        .pipe(
          tap((response) => {
            console.log('usuário cadastrado com sucesso!', response);
            localStorage.setItem('token', response.token);

            // Redirecionar o usuário para a página inicial
            this.router.navigate(['/']);
          }),
          catchError((error) => {
            console.log('Erro ao cadastrar usuário:', error);

            this.errorMessage = 'Erro ao fazer cadastro: ' + error.message;
            return of(error); // Propaga o erro como um Observable
          })
        )
        .subscribe();
    }
  }
}
