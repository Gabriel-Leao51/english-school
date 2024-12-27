import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import {
  AsyncPipe,
  CurrencyPipe,
  NgFor,
  NgIf,
  isPlatformBrowser,
} from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

import { Curso } from '../../models/curso.model';
import { CursoService } from '../../services/curso.service';

import { CarregarImagemDirective } from '../../directives/imgLoader.directive';
import { Observable, take } from 'rxjs';

@Component({
  selector: 'app-curso-detalhes',
  standalone: true,
  imports: [NgIf, NgFor, CurrencyPipe, CarregarImagemDirective, AsyncPipe],
  templateUrl: './curso-detalhes.component.html',
  styleUrls: ['./curso-detalhes.component.css'],
})
export class CursoDetalhesComponent implements OnInit {
  curso$!: Observable<Curso | undefined>; // Use um Observable para o curso

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
    if (isPlatformBrowser(this.platformId)) {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.curso$ = this.cursoService.obterCursoPorId(id).pipe();
      }
    }
  }

  matricular() {
    this.curso$
      .pipe(
        take(1) // Pega o primeiro valor emitido pelo Observable (o curso) e depois completa
      )
      .subscribe((curso) => {
        if (curso) {
          this.cursoService.selecionarCurso(curso);
          this.router.navigate(['/contato']);
        }
      });
  }
}
