import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { ContatoService } from '../../services/contato.service';
import { CursoService } from '../../services/curso.service';
import { AuthService } from '../../services/auth.service';

import { Curso } from '../../models/curso.model';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contato-main',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './contato-main.component.html',
  styleUrls: ['./contato-main.component.css'],
})
export class ContatoMainComponent implements OnInit, OnDestroy {
  contatoForm!: FormGroup;
  enviandoMensagem: boolean = false; // Controla a exibição do loading
  mensagemEnviada: boolean = false; // Controla a mensagem de sucesso
  erroEnvio: boolean = false; // Controla a mensagem de erro
  cursoSelecionado: Curso | null = null;
  private inscricaoCurso: Subscription | undefined; // Para gerenciar a inscrição

  constructor(
    private contatoService: ContatoService,
    private fb: FormBuilder,
    private cursoService: CursoService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.criarFormulario();
    this.inscricaoCurso = this.cursoService.cursoSelecionado$.subscribe(
      (curso) => {
        this.cursoSelecionado = curso;
        if (this.cursoSelecionado) {
          this.contatoForm.patchValue({
            assunto: `Matrícula no curso ${this.cursoSelecionado.titulo}`,
            mensagem: `Olá, gostaria de me matricular no curso ${this.cursoSelecionado.titulo}.`,
          });
        }
      }
    );

    this.authService.currentUser$.subscribe((user) => {
      if (user) {
        this.contatoForm.patchValue({
          nome: user.name,
          email: user.email,
        });
      }
    });
  }

  ngOnDestroy() {
    // Limpa a inscrição ao destruir o componente
    if (this.inscricaoCurso) {
      this.inscricaoCurso.unsubscribe();
    }
    this.cursoService.limparCursoSelecionado(); // Limpa o curso selecionado do serviço
  }

  criarFormulario() {
    this.contatoForm = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: [''], // Opcional
      assunto: ['', Validators.required],
      mensagem: ['', Validators.required],
    });
  }

  enviarFormulario() {
    if (this.contatoForm.invalid) {
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
