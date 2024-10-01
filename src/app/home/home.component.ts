import { Component } from '@angular/core';
import { MainComponent } from './main/main.component';
import { CursosGridComponent } from './cursos-grid/cursos-grid.component';
import { SobreComponent } from './sobre/sobre.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MainComponent, CursosGridComponent, SobreComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {}
