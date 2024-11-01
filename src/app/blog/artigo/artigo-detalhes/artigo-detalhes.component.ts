import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BlogService } from '../../../services/blog.service';
import { Artigo } from '../../../models/artigo.model';
import { switchMap } from 'rxjs';
import { DatePipe, NgIf } from '@angular/common';
import { BlogBannerComponent } from '../../blog-banner/blog-banner.component';

@Component({
  selector: 'app-artigo-detalhes',
  standalone: true,
  imports: [RouterLink, NgIf, DatePipe, BlogBannerComponent],
  templateUrl: './artigo-detalhes.component.html',
  styleUrl: './artigo-detalhes.component.css',
})
export class ArtigoDetalhesComponent implements OnInit {
  artigo!: Artigo | null; // Artigo ou null se não encontrado
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(
        switchMap((params) => {
          const artigoId = params['id'];
          return this.blogService.getArtigo(artigoId);
        })
      )
      .subscribe({
        next: (artigo) => {
          this.artigo = artigo;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Erro ao carregar artigo:', error);
          this.isLoading = false; // importante para evitar o loading infinito
          this.artigo = null; // Define o artigo como null em caso de erro
        },
      });
  }
}
