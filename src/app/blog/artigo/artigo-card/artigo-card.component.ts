import { Component, Input, ViewContainerRef } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { DatePipe, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Artigo } from '../../../models/artigo.model';
import { BlogService } from '../../../services/blog.service';

import { ModalComponent } from '../../../shared/modal/modal.component';
import { PostFormComponent } from '../../post-form/post-form.component';

@Component({
  selector: 'app-artigo-card',
  standalone: true,
  imports: [ModalComponent, PostFormComponent, NgIf, DatePipe, RouterLink],
  templateUrl: './artigo-card.component.html',
  styleUrl: './artigo-card.component.css',
})
export class ArtigoComponent {
  @Input() artigo!: Artigo; // Recebe o artigo como input
  @Input() modalContainer!: ViewContainerRef; // Recebe o ViewContainerRef
  @Output() artigoEditado = new EventEmitter<void>();
  @Output() artigoExcluido = new EventEmitter<void>();
  artigos: Artigo[] = [];
  isLoading = true;

  constructor(private blogService: BlogService) {}

  editarArtigo(artigo: Artigo) {
    // Abra o EditarPostComponent em um modal ou roteie para ele
    const modalRef = this.modalContainer.createComponent(PostFormComponent);
    modalRef.instance.artigoId = artigo._id;
    modalRef.instance.isEditing = true;
    modalRef.instance.artigoSalvo.subscribe(() => {
      this.artigoEditado.emit(); // Recarrega a lista
    });
    modalRef.instance.openModal();
  }

  excluirArtigo(artigo: Artigo) {
    if (
      confirm(`Tem certeza de que deseja excluir o artigo "${artigo.title}"?`)
    ) {
      this.blogService.deleteArtigo(artigo._id).subscribe({
        next: () => {
          this.artigoExcluido.emit();
        },
        error: (error) => {
          console.error('Erro ao excluir artigo:', error);
          // Lidar com o erro, talvez mostrar uma mensagem ao usuário
        },
      });
    }
  }

  // Opcional: Método para truncar o conteúdo do artigo
  truncateContent(content: string, maxLength: number = 100): string {
    if (content.length > maxLength) {
      return content.substring(0, maxLength) + '...';
    }
    return content;
  }
}
