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
      imagem: 'assets/imagens/crianças.jpg',
      descricao: 'Nunca é cedo demais para aprender!',
    },
    {
      titulo: 'Adolescentes',
      imagem: 'assets/imagens/adolescentes.jpg',
      descricao: 'Desenvolvendo habilidades para o futuro!',
    },
    {
      titulo: 'Adultos',
      imagem: 'assets/imagens/adultos.jpg',
      descricao: 'Expanda seus horizontes, domine o inglês!',
    },
    {
      titulo: 'Professores',
      imagem: 'assets/imagens/professores.jpg',
      descricao: 'Aprimorando o ensino da língua inglesa.',
    },
  ];
}
