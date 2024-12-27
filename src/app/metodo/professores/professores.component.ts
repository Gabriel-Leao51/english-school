import { Component, OnInit } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';

import { ProfessorService } from '../../services/professor.service';
import { Professor } from '../../models/professor.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-professores',
  standalone: true,
  imports: [NgIf, NgFor, AsyncPipe],
  templateUrl: './professores.component.html',
  styleUrl: './professores.component.css',
})
export class ProfessoresComponent implements OnInit {
  professores$!: Observable<Professor[]>;

  constructor(private professorService: ProfessorService) {}

  ngOnInit(): void {
    this.obterProfessores();
  }

  obterProfessores(): void {
    this.professores$ = this.professorService.getProfessores();
  }
}
