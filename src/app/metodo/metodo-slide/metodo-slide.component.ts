import { NgClass, NgFor } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';

interface Slide {
  active: boolean;
  titulo: string;
  descricao: string;
  imagem: string;
}

@Component({
  selector: 'app-metodo-slide',
  standalone: true,
  imports: [NgFor, NgClass],
  templateUrl: './metodo-slide.component.html',
  styleUrl: './metodo-slide.component.css',
})
export class MetodoSlideComponent implements AfterViewInit {
  slides: Slide[] = [
    // Defina os slides aqui
    {
      titulo: 'Aprenda Inglês de Forma Natural e Imersiva',
      descricao:
        'Nossos cursos proporcionam uma experiência imersiva em inglês, com foco na comunicação e na fluência desde o primeiro dia.',
      imagem: 'assets/imagens/slide1.jpg',
      active: true,
    },
    {
      titulo: 'Professores Apaixonados por Ensinar Inglês',
      descricao:
        'Nossa equipe de professores é altamente qualificada, experiente e dedicada a ajudar você a alcançar seus objetivos.',
      imagem: 'assets/imagens/slide2.jpg',
      active: false,
    },

    {
      titulo: 'Método Personalizado para o Seu Sucesso',
      descricao:
        'Oferecemos um método de ensino personalizado, que se adapta às suas necessidades e ao seu ritmo de aprendizado.',
      imagem: 'assets/imagens/slide3.jpg',
      active: false,
    },
  ];

  activeSlideIndex = 0;

  ngAfterViewInit(): void {}

  proximoSlide(): void {
    this.activeSlideIndex = (this.activeSlideIndex + 1) % this.slides.length;
  }

  goToSlide(index: number): void {
    this.activeSlideIndex = index;
  }
}
