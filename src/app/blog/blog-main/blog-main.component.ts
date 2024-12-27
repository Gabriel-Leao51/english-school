import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { BlogService } from '../../services/blog.service';
import { AuthService } from '../../services/auth.service';
import { Artigo } from '../../models/artigo.model';

import { ArtigoComponent } from '../artigo/artigo-card/artigo-card.component';
import { PostFormComponent } from '../post-form/post-form.component';

import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-blog-main',
  standalone: true,
  imports: [ArtigoComponent, NgFor, NgIf, ReactiveFormsModule, AsyncPipe],
  templateUrl: './blog-main.component.html',
  styleUrl: './blog-main.component.css',
})
export class BlogMainComponent implements OnInit {
  @ViewChild('modal', { read: ViewContainerRef, static: true })
  modalContainer!: ViewContainerRef;
  artigos$!: Observable<Artigo[]>;
  isLoading = true;
  showModal = false;
  filtroBusca = new FormControl('');
  criterioBusca: 'titulo' | 'autor' | 'categoria' = 'titulo'; // Critério de busca ativo

  constructor(
    private blogService: BlogService,
    public authService: AuthService
  ) {}

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
    this.artigos$ = this.blogService.getArtigos().pipe(
      tap(() => (this.isLoading = false)) // Atualize isLoading para false após o carregamento
    );
  }

  alterarCriterio(novoCriterio: 'titulo' | 'autor' | 'categoria') {
    this.criterioBusca = novoCriterio;
    this.filtroBusca.reset(); // Limpa o campo de busca ao mudar o critério
  }

  artigosFiltrados(artigos: Artigo[]): Artigo[] {
    const termoBusca = this.filtroBusca.value?.toLowerCase().trim();

    if (!termoBusca) {
      return artigos;
    }

    return artigos.filter((artigo) => {
      switch (this.criterioBusca) {
        case 'titulo':
          return artigo.title.toLowerCase().includes(termoBusca);
        case 'autor':
          return artigo.author.toLowerCase().includes(termoBusca);
        case 'categoria':
          return artigo.category.toLowerCase().includes(termoBusca);
        default:
          return true;
      }
    });
  }
}
