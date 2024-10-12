import { Component, OnInit } from '@angular/core';
import { BeneficiosCtaComponent } from './beneficios-cta/beneficios-cta.component';
import { CursosMainComponent } from './cursos-main/cursos-main.component';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-cursos',
  standalone: true,
  imports: [CursosMainComponent, BeneficiosCtaComponent],
  templateUrl: './cursos.component.html',
})
export class CursosComponent implements OnInit {
  constructor(private router: Router) {}
  scrollYPosition = 0;

  ngOnInit(): void {
    // Salva a posição de rolagem antes de sair da página
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        window.addEventListener('load', () => {
          // Movemos o listener para ngOnInit
          this.scrollYPosition = window.scrollY;
        });
      }
    });

    // Restaura a posição de rolagem ao voltar para a página
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd && event.url === '/cursos') {
        window.addEventListener('load', () => {
          window.scrollTo(0, this.scrollYPosition);
        });
      }
    });
  }
}
