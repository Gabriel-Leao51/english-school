import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-beneficios-cta',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './beneficios-cta.component.html',
  styleUrls: ['./beneficios-cta.component.css'],
})
export class BeneficiosCtaComponent {
  beneficios = [
    {
      icone: 'fa fa-graduation-cap',
      titulo: 'Metodologia Inovadora',
      descricao:
        'Aprenda inglês de forma rápida, prática e eficaz com nossa metodologia exclusiva.',
      cor: 'var(--cor-texto-secundaria)',
    }, // Verde Esmeralda
    {
      icone: 'fa fa-users',
      titulo: 'Professores Experientes',
      descricao:
        'Nossos professores são altamente qualificados e apaixonados por ensinar inglês.',
      cor: 'var(--cor-texto-secundaria)',
    }, // Dourado Quente
    {
      icone: 'fa fa-book',
      titulo: 'Material Didático Completo',
      descricao:
        'Tenha acesso a um material didático moderno e interativo, com livros, plataformas online e recursos multimídia.',
      cor: 'var(--cor-texto-secundaria)',
    }, // Vermelho Escuro ;
  ];

  aplicarCor(event: any): void {
    const icone = event.target as HTMLElement;
  }
}
