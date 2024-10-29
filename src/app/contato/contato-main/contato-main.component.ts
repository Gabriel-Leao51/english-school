import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContatoService } from '../../services/contato.service';
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
  enviandoMensagem: boolean = false; // Controla a exibição do loading
  mensagemEnviada: boolean = false; // Controla a mensagem de sucesso
  erroEnvio: boolean = false; // Controla a mensagem de erro

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

    this.enviandoMensagem = true; // Ativa o loading
    this.mensagemEnviada = false; // Reseta as mensagens
    this.erroEnvio = false;

    this.contatoService.enviarMensagem(this.contatoForm.value).subscribe(
      (response) => {
        console.log('Resposta da API:', response);
        this.contatoForm.reset();
        this.enviandoMensagem = false; // Desativa o loading
        this.mensagemEnviada = true; // Exibe a mensagem de sucesso
      },
      (error) => {
        console.error('Erro ao enviar mensagem:', error);
        this.enviandoMensagem = false; // Desativa o loading
        this.erroEnvio = true; // Exibe a mensagem de erro
      }
    );
  }
}
