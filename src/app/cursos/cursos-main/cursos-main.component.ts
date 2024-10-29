import { Component, OnInit } from '@angular/core';
import { CursoService } from '../../services/curso.service';
import { Curso } from '../../models/curso.model';
import { NgFor, NgIf } from '@angular/common';
import { BeneficiosCtaComponent } from '../beneficios-cta/beneficios-cta.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cursos-main',
  standalone: true,
  imports: [NgIf, NgFor, BeneficiosCtaComponent, RouterLink],
  providers: [CursoService],
  templateUrl: './cursos-main.component.html',
  styleUrls: ['./cursos-main.component.css'],
})
export class CursosMainComponent implements OnInit {
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
