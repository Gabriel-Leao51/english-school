import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service'; // Importe o serviço
import { NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  providers: [AuthService],
  imports: [ReactiveFormsModule, NgIf, HttpClientModule],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
})
export class CadastroComponent {
  cadastroForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.cadastroForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.cadastroForm.valid) {
      this.authService.cadastrar(this.cadastroForm.value).subscribe(
        (response) => {
          console.log('Usuário cadastrado com sucesso!', response);
          // Redirecione para a página de login
        },
        (error) => {
          console.error('Erro ao cadastrar usuário:', error);
          // Lide com os erros, exiba mensagens de erro para o usuário, etc.
        }
      );
    }
  }
}
