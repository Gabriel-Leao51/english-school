import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { BlogService } from '../../../services/blog.service';
import { AuthService } from '../../../services/auth.service';

import { Artigo, Comment } from '../../../models/artigo.model';
import { DatePipe, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-artigo-comentarios',
  standalone: true,
  imports: [ReactiveFormsModule, DatePipe, NgIf, NgFor],
  templateUrl: './artigo-comentarios.component.html',
  styleUrls: ['./artigo-comentarios.component.css'],
})
export class ArtigoComentariosComponent implements OnInit {
  @Input() artigoId!: string; // Recebe o ID do artigo como input
  comentarios: Comment[] = [];
  userName: string | null = null;
  novoComentarioForm!: FormGroup;
  isLoading = true;

  constructor(
    private fb: FormBuilder,
    private blogService: BlogService,
    public authService: AuthService
  ) {
    this.authService.currentUser$.subscribe((user) => {
      // Inscreve-se no currentUser$
      this.userName = user ? user.name : null; // Atualiza o nome do usuário, ajustando 'name' ao nome do atributo que você usa para o nome
    });
  }

  ngOnInit(): void {
    this.createForm();
    this.carregarComentarios();
  }

  createForm() {
    this.novoComentarioForm = this.fb.group({
      content: ['', Validators.required], // Apenas o campo content
    });
  }

  carregarComentarios() {
    this.blogService.getComments(this.artigoId).subscribe({
      next: (comments) => {
        this.comentarios = comments;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar os comentários:', err);
        this.isLoading = false;
      },
    });
  }

  adicionarComentario() {
    if (!this.authService.isAuthenticated()) {
      // Verifica autenticação
      return;
    }

    const novoComentario: Comment = {
      ...this.novoComentarioForm.value,
      author: this.userName || 'Usuário Desconhecido', // Define o autor como o nome do usuário logado
      userId: this.authService.getUserId(), // Define o userId para rastrear quem comentou
    };

    console.log('Comentário a ser enviado:', novoComentario);

    this.blogService.addComment(this.artigoId, novoComentario).subscribe({
      next: (comment) => {
        this.comentarios.push(comment); // Adiciona o comentário à lista
        this.novoComentarioForm.reset(); // Limpa o formulário
        this.carregarComentarios();
      },
      error: (err) => {
        console.error('Erro ao adicionar comentário:', err);
      },
    });
  }

  excluirComentario(comentario: Comment) {
    if (!this.authService.isAuthenticated()) {
      return; // Impede a exclusão se não estiver autenticado
    }

    const podeExcluir =
      this.authService.getRole() === 'admin' ||
      comentario.userId === this.authService.getUserId();

    if (!podeExcluir) {
      // Exibir uma mensagem informando que o usuário não tem permissão para excluir
      alert('Você não tem permissão para excluir este comentário.'); // Ou um feedback mais amigável
      return;
    }

    console.log(comentario.userId);

    if (!podeExcluir) {
      return; // Impede usuários de excluirem comentários de outros
    }

    if (confirm(`Tem certeza de que deseja excluir este comentário?`)) {
      this.blogService.deleteComment(this.artigoId, comentario._id).subscribe({
        next: () => {
          this.comentarios = this.comentarios.filter(
            (c) => c._id !== comentario._id
          );
        },
        error: (err) => {
          console.error('Erro ao excluir comentário:', err);
        },
      });
    }
  }
}
