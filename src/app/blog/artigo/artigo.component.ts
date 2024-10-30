import { Component, Input } from '@angular/core';
import { Artigo } from '../../models/artigo.model';
import { DatePipe, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-artigo',
  standalone: true,
  imports: [NgIf, DatePipe, RouterLink],
  templateUrl: './artigo.component.html',
  styleUrl: './artigo.component.css',
})
export class ArtigoComponent {
  @Input() artigo!: Artigo; // Recebe o artigo como input

  // Opcional: Método para truncar o conteúdo do artigo
  truncateContent(content: string, maxLength: number = 100): string {
    if (content.length > maxLength) {
      return content.substring(0, maxLength) + '...';
    }
    return content;
  }
}
