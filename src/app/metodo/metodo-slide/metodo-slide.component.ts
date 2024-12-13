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
      imagem:
        'https://res.cloudinary.com/dxokgmnnc/image/upload/v1734039313/slide1_bmjftj.jpg',
      active: true,
    },
    {
      titulo: 'Professores Apaixonados por Ensinar Inglês',
      descricao:
        'Nossa equipe de professores é altamente qualificada, experiente e dedicada a ajudar você a alcançar seus objetivos.',
      imagem:
        'https://res.cloudinary.com/dxokgmnnc/image/upload/v1734039316/slide2_mxb3yo.jpg',
      active: false,
    },

    {
      titulo: 'Método Personalizado para o Seu Sucesso',
      descricao:
        'Oferecemos um método de ensino personalizado, que se adapta às suas necessidades e ao seu ritmo de aprendizado.',
      imagem:
        'https://res.cloudinary.com/dxokgmnnc/image/upload/v1734039315/slide3_q7robb.jpg',
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
