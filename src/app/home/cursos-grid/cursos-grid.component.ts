import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { CarregarImagemDirective } from '../../directives/imgLoader.directive';

@Component({
  selector: 'app-cursos-grid',
  standalone: true,
  imports: [NgFor, CarregarImagemDirective],
  templateUrl: './cursos-grid.component.html',
  styleUrl: './cursos-grid.component.css',
})
export class CursosGridComponent {
  cursos = [
    {
      titulo: 'Crianças',
      imagem:
        'https://res.cloudinary.com/dxokgmnnc/image/upload/v1734039245/crian%C3%A7as_le03s0.jpg',
      descricao: 'Nunca é cedo demais para aprender!',
    },
    {
      titulo: 'Adolescentes',
      imagem:
        'https://res.cloudinary.com/dxokgmnnc/image/upload/v1734039245/adolescentes_lc3vzt.jpg',
      descricao: 'Desenvolvendo habilidades para o futuro!',
    },
    {
      titulo: 'Adultos',
      imagem:
        'https://res.cloudinary.com/dxokgmnnc/image/upload/v1734039245/adultos_rpoapk.jpg',
      descricao: 'Expanda seus horizontes, domine o inglês!',
    },
    {
      titulo: 'Professores',
      imagem:
        'https://res.cloudinary.com/dxokgmnnc/image/upload/v1734039246/professores_wetlbv.jpg',
      descricao: 'Aprimorando o ensino da língua inglesa.',
    },
  ];
}
