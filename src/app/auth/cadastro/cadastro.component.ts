import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

import { NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ToastrService } from 'ngx-toastr';
import { catchError, tap } from 'rxjs';
import { of } from 'rxjs';
import { ModalComponent } from '../../shared/modal/modal.component';

@Component({
  selector: 'app-cadastro',
  standalone: true,
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
    private router: Router,
    private toastr: ToastrService
  ) {
    this.cadastroForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  openModal() {
    this.showModal = true; // Apenas altera o estado da modal
  }

  closeModal(modalId: string) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = 'none';
    }
  }

  onSubmit() {
    if (this.cadastroForm.valid) {
      this.authService
        .cadastrar(this.cadastroForm.value)
        .pipe(
          tap(() => {
            this.toastr.success('Cadastro realizado com sucesso!', 'Sucesso');
            this.closeModal('cadastroModal');
            window.location.reload();
          }),
          catchError((error) => {
            console.error('Erro ao cadastrar usuário:', error);
            this.toastr.error(
              error.error?.error || 'Erro ao cadastrar. Verifique os dados.',
              'Erro'
            ); // Exibe a mensagem de erro do backend ou uma mensagem genérica
            return of(null); // Retorna um observable vazio para evitar erros subsequentes
          })
        )
        .subscribe();
    }
  }
}
