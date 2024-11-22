import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: 'img[appCarregarImagem]', // Aplicar a diretiva a todas as tags <img> com o atributo appCarregarImagem
  standalone: true,
})
export class CarregarImagemDirective implements OnInit {
  @Input() src!: string; // Recebe o caminho da imagem via input 'src'
  showImage = false;

  constructor(
    private el: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Verifica se está no navegador
      const img = new Image();
      img.onload = () => {
        this.showImage = true;
        this.el.nativeElement.src = this.src;
      };

      if (this.src) {
        img.src = this.src;
      }
    } else {
      // Lógica para o servidor (opcional)
      // Você pode definir um src padrão aqui, se necessário
      this.showImage = true; //ou defina um src padrão aqui, se necessário
    }
  }
}
