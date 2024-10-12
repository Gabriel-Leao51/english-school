import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CursoService } from '../curso.service'; // Importe o serviço de cursos
import { Curso } from '../curso'; // Importe a interface Curso
import { CurrencyPipe, NgFor, NgIf, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-curso-detalhes',
  standalone: true,
  imports: [NgIf, NgFor, CurrencyPipe],
  templateUrl: './curso-detalhes.component.html',
  styleUrls: ['./curso-detalhes.component.css'],
})
export class CursoDetalhesComponent implements OnInit {
  curso: Curso | undefined; // Variável para armazenar os detalhes do curso

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private route: ActivatedRoute, // Para obter o ID do curso da URL
    private cursoService: CursoService // Para buscar os dados do curso na API
  ) {}

  ngOnInit(): void {
    this.obterCurso();
  }

  obterCurso(): void {
    const id = this.route.snapshot.paramMap.get('id'); // Obtém o ID da URL

    if (isPlatformBrowser(this.platformId)) {
      // Código que utiliza window
      if (id) {
        this.cursoService.obterCursoPorId(id).subscribe((curso) => {
          this.curso = curso;
        });
      }

      console.log(window.innerWidth); // Exemplo de acesso ao objeto window
    }
  }
}
