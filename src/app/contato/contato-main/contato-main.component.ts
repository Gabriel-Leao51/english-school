import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContatoService } from '../contato.service';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-contato-main',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf], // Importe o ReactiveFormsModule
  templateUrl: './contato-main.component.html',
  styleUrls: ['./contato-main.component.css'],
})
export class ContatoMainComponent implements OnInit {
  contatoForm!: FormGroup; // Crie o FormGroup

  constructor(
    private contatoService: ContatoService,
    private fb: FormBuilder // Injete o FormBuilder
  ) {}

  ngOnInit(): void {
    // Inicialize o formulário no ngOnInit
    this.criarFormulario();
  }

  criarFormulario() {
    this.contatoForm = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: [''], // Opcional, mas podemos adicionar validação personalizada depois
      assunto: ['', Validators.required],
      mensagem: ['', Validators.required],
    });
  }

  enviarFormulario() {
    if (this.contatoForm.invalid) {
      // Exiba mensagens de erro ou impeça o envio
      this.contatoForm.markAllAsTouched(); // Para exibir as mensagens de erro
      return;
    }

    const formData = this.contatoForm.value;
    console.log('Enviando dados:', formData); // Debug

    this.contatoService.enviarMensagem(formData).subscribe(
      (response) => {
        // Lidar com a resposta de sucesso da API
        console.log('Resposta da API:', response);
        // Limpe o formulário após o envio com sucesso
        this.contatoForm.reset();
      },
      (error) => {
        // Lidar com erros da API
        console.error('Erro ao enviar mensagem:', error);
        // Exiba uma mensagem de erro ao usuário
      }
    );
  }
}
