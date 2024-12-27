import { Component, OnInit } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Curso } from '../../models/curso.model';
import { CursoService } from '../../services/curso.service';

import { CarregarImagemDirective } from '../../directives/imgLoader.directive';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cursos-main',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink, CarregarImagemDirective, AsyncPipe],
  providers: [CursoService],
  templateUrl: './cursos-main.component.html',
  styleUrls: ['./cursos-main.component.css'],
})
export class CursosMainComponent implements OnInit {
  cursos$!: Observable<Curso[]>;
  modalidades: string[] = [
    'Crianças',
    'Adolescentes',
    'Adultos',
    'Professores',
  ];

  constructor(private cursoService: CursoService) {}

  ngOnInit(): void {
    this.obterCursos();
  }

  obterCursos(): void {
    this.cursos$ = this.cursoService.obterCursos();
  }

  obterFaixaEtaria(modalidade: string): string {
    switch (modalidade) {
      case 'Crianças':
        return '6-12 anos';
      case 'Adolescentes':
        return '13+ anos';
      case 'Adultos':
        return '18+ anos';
      case 'Professores':
        return '22+ anos';
      default:
        return '';
    }
  }
}
