import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './home/main/main.component';
import { CursosGridComponent } from './home/cursos-grid/cursos-grid.component';
import { SobreComponent } from './home/sobre/sobre.component';
import { FooterComponent } from './home/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    MainComponent,
    CursosGridComponent,
    SobreComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'english-school';
}
