import { Component } from '@angular/core';
import { MetodoSlideComponent } from './metodo-slide/metodo-slide.component';
import { EnsinoComponent } from './ensino/ensino.component';
import { ProfessoresComponent } from './professores/professores.component';

@Component({
  selector: 'app-metodo',
  standalone: true,
  imports: [MetodoSlideComponent, EnsinoComponent, ProfessoresComponent],
  templateUrl: './metodo.component.html',
})
export class MetodoComponent {}
