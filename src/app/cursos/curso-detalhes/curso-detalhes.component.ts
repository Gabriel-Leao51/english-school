import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CurrencyPipe, NgFor, NgIf, isPlatformBrowser } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

import { Curso } from '../../models/curso.model';
import { CursoService } from '../../services/curso.service';

import { CarregarImagemDirective } from '../../directives/imgLoader.directive';

@Component({
  selector: 'app-curso-detalhes',
  standalone: true,
  imports: [NgIf, NgFor, CurrencyPipe, CarregarImagemDirective],
  templateUrl: './curso-detalhes.component.html',
  styleUrls: ['./curso-detalhes.component.css'],
})
export class CursoDetalhesComponent implements OnInit {
  curso: Curso | undefined; // Variável para armazenar os detalhes do curso

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
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
        this.cursoService.obterCursoPorId(id).subscribe((curso: Curso) => {
          this.curso = curso;
        });
      }
    }
  }

  exibirNomeProfessor(): string {
    // Verifica se o curso e o professor estão carregados antes de acessar o nome
    if (this.curso && this.curso.professor) {
      return this.curso.professor.nome;
    } else {
      return 'Professor não encontrado';
    }
  }

  matricular() {
    if (this.curso) {
      this.cursoService.selecionarCurso(this.curso);
      this.router.navigate(['/contato']);
    }
  }
}
