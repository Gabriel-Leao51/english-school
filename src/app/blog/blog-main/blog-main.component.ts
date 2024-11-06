import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { BlogService } from '../../services/blog.service';
import { Artigo } from '../../models/artigo.model';

import { ArtigoComponent } from '../artigo/artigo-card/artigo-card.component';
import { ModalComponent } from '../../shared/modal/modal.component';
import { PostFormComponent } from '../post-form/post-form.component';

import { finalize, tap } from 'rxjs';

@Component({
  selector: 'app-blog-main',
  standalone: true,
  imports: [
    ArtigoComponent,
    ModalComponent,
    PostFormComponent,
    NgFor,
    NgIf,
    ReactiveFormsModule,
  ],
  templateUrl: './blog-main.component.html',
  styleUrl: './blog-main.component.css',
})
export class BlogMainComponent implements OnInit {
  @ViewChild('modal', { read: ViewContainerRef, static: true })
  modalContainer!: ViewContainerRef;
  artigos: Artigo[] = [];
  isLoading = true;
  showModal = false;
  filtroBusca = new FormControl('');
  criterioBusca: 'titulo' | 'autor' | 'categoria' = 'titulo'; // Critério de busca ativo

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.reloadArtigos();
  }

  abrirModalNovoPost() {
    const modalRef = this.modalContainer.createComponent(PostFormComponent);
    modalRef.instance.isEditing = false; // Define como modo de criação
    modalRef.instance.artigoSalvo.subscribe(() => {
      this.reloadArtigos();
    });
    modalRef.instance.openModal();
  }

  reloadArtigos() {
    this.isLoading = true;
    this.blogService
      .getArtigos()
      .pipe(
        tap((artigos) => (this.artigos = artigos)),
        finalize(() => (this.isLoading = false))
      )
      .subscribe({
        error: (error) => {
          console.error('Erro ao buscar artigos:', error);
        },
        complete: () => {
          console.log('Recarregamento de artigos completo.');
        },
      });
  }

  alterarCriterio(novoCriterio: 'titulo' | 'autor' | 'categoria') {
    this.criterioBusca = novoCriterio;
    this.filtroBusca.reset(); // Limpa o campo de busca ao mudar o critério
  }

  artigosFiltrados(): Artigo[] {
    const termoBusca = this.filtroBusca.value?.toLowerCase().trim();

    if (!termoBusca) {
      return this.artigos; // Retorna todos os artigos se o campo de busca estiver vazio
    }

    return this.artigos.filter((artigo) => {
      switch (this.criterioBusca) {
        case 'titulo':
          return artigo.title.toLowerCase().includes(termoBusca);
        case 'autor':
          return artigo.author.toLowerCase().includes(termoBusca);
        case 'categoria':
          return artigo.category.toLowerCase().includes(termoBusca);
        default:
          return true; // Ou retornar false, dependendo do comportamento desejado
      }
    });
  }
}
