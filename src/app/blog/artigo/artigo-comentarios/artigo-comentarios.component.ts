import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { BlogService } from '../../../services/blog.service';
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
  novoComentarioForm!: FormGroup;
  isLoading = true;

  constructor(private fb: FormBuilder, private blogService: BlogService) {}

  ngOnInit(): void {
    this.createForm();
    this.carregarComentarios();
  }

  createForm() {
    this.novoComentarioForm = this.fb.group({
      author: ['', Validators.required],
      content: ['', Validators.required],
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
    if (this.novoComentarioForm.invalid) {
      return;
    }

    const novoComentario: Comment = this.novoComentarioForm.value;

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
    if (confirm(`Tem certeza de que deseja excluir este comentário?`)) {
      this.blogService.deleteComment(this.artigoId, comentario._id).subscribe({
        next: () => {
          // Remove o comentário da lista
          this.comentarios = this.comentarios.filter(
            (c) => c._id !== comentario._id
          );
        },
        error: (err) => {
          console.error('Erro ao excluir comentário:', err);
          // Lidar com o erro (ex: exibir uma mensagem para o usuário)
        },
      });
    }
  }
}
