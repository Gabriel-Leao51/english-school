import { Component, OnInit } from '@angular/core';
import { ProfessorService } from '../../services/professor.service';
import { Professor } from '../../models/professor.model';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-professores',
  standalone: true,
  imports: [NgFor],
  templateUrl: './professores.component.html',
  styleUrl: './professores.component.css',
})
export class ProfessoresComponent implements OnInit {
  professores: Professor[] = [];

  constructor(private professorService: ProfessorService) {}

  ngOnInit(): void {
    this.obterProfessores();
  }

  obterProfessores(): void {
    this.professorService
      .getProfessores()
      .subscribe((professores) => (this.professores = professores));
  }
}
