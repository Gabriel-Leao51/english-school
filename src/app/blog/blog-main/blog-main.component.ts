import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

import { BlogService } from '../../services/blog.service';
import { Artigo } from '../../models/artigo.model';

import { ArtigoComponent } from '../artigo/artigo.component';
import { ModalComponent } from '../../shared/modal/modal.component';
import { NovoPostComponent } from '../novo-post/novo-post.component';

import { finalize, tap } from 'rxjs';

@Component({
  selector: 'app-blog-main',
  standalone: true,
  imports: [ArtigoComponent, ModalComponent, NovoPostComponent, NgFor, NgIf],
  templateUrl: './blog-main.component.html',
  styleUrl: './blog-main.component.css',
})
export class BlogMainComponent implements OnInit {
  @ViewChild('modal', { read: ViewContainerRef })
  modalContainer!: ViewContainerRef;
  @ViewChild('novoPostComponent') novoPostComponent!: NovoPostComponent;
  artigos: Artigo[] = [];
  isLoading = true;
  showModal = false;

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.reloadArtigos();
  }

  abrirModalNovoPost() {
    const novoPostComponent =
      this.modalContainer.createComponent(NovoPostComponent);
    novoPostComponent.instance.openModal();
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
}
