import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../auth.service'; // Importe o serviço
import { NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  providers: [AuthService],
  imports: [ReactiveFormsModule, NgIf, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        (response) => {
          console.log('Login bem-sucedido!', response);
          // Armazene o token no localStorage (ex: localStorage.setItem('token', response.token);)
          // Redirecione o usuário
        },
        (error) => {
          console.error('Erro ao fazer login:', error);
          // Lide com os erros, exiba mensagens de erro para o usuário, etc.
        }
      );
    }
  }
}
