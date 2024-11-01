import { Component, Input } from '@angular/core';
import { Artigo } from '../../models/artigo.model';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-blog-banner',
  standalone: true,
  imports: [NgIf],
  templateUrl: './blog-banner.component.html',
  styleUrl: './blog-banner.component.css',
})
export class BlogBannerComponent {
  @Input() artigo!: Artigo | null; // Recebe o artigo como input
  @Input() isArticleDetail = false;

  get titulo() {
    return this.isArticleDetail && this.artigo
      ? this.artigo.title
      : 'Bem-vindo ao Nosso Blog';
  }

  get paragrafo() {
    return this.isArticleDetail && this.artigo
      ? `Por: ${this.artigo.author}`
      : 'Explore as últimas notícias e artigos.';
  }
}
