import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

import { BlogService } from '../../services/blog.service';
import { Artigo } from '../../models/artigo.model';

import { ArtigoComponent } from '../artigo/artigo-card/artigo-card.component';
import { ModalComponent } from '../../shared/modal/modal.component';
import { PostFormComponent } from '../post-form/post-form.component';

import { finalize, tap } from 'rxjs';

@Component({
  selector: 'app-blog-main',
  standalone: true,
  imports: [ArtigoComponent, ModalComponent, PostFormComponent, NgFor, NgIf],
  templateUrl: './blog-main.component.html',
  styleUrl: './blog-main.component.css',
})
export class BlogMainComponent implements OnInit {
  @ViewChild('modal', { read: ViewContainerRef, static: true })
  modalContainer!: ViewContainerRef;
  artigos: Artigo[] = [];
  isLoading = true;
  showModal = false;

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
}
