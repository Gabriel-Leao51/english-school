import { Component, OnInit } from '@angular/core';
import { CursoService } from './curso.service';
import { Curso } from './curso';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-cursos',
  standalone: true,
  imports: [NgIf, NgFor],
  providers: [CursoService],
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css'],
})
export class CursosComponent implements OnInit {
  cursos: Curso[] = [];
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
    this.cursoService
      .obterCursos()
      .subscribe((cursos: Curso[]) => (this.cursos = cursos));
  }

  obterFaixaEtaria(modalidade: string): string {
    switch (modalidade) {
      case 'Crianças':
        return '6-12 anos';
      case 'Adolescentes':
        return '13-17 anos';
      case 'Adultos':
        return '18+ anos';
      case 'Professores':
        return '22+ anos';
      default:
        return '';
    }
  }
}
