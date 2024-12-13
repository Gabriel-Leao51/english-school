import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sobre',
  standalone: true,
  imports: [NgFor],
  templateUrl: './sobre.component.html',
  styleUrls: ['./sobre.component.css'],
})
export class SobreComponent {
  sobreEscolaData = [
    {
      titulo: 'Imersão natural para um aprendizado eficaz.',
      descricao:
        'Esqueça as carteiras enfileiradas e as aulas monótonas! Nosso método de ensino se baseia na imersão natural, com foco na conversação e na aplicação prática do inglês em situações reais. Através de atividades dinâmicas e materiais engajadores, você desenvolverá fluência e confiança para se comunicar em qualquer situação.',
      imagem:
        'https://res.cloudinary.com/dxokgmnnc/image/upload/v1734039246/metodo_nqgkcc.jpg',
      alt: 'Método de Ensino',
    },
    {
      titulo: 'Flexibilidade para aprender onde e quando quiser.',
      descricao:
        'Adeque seus estudos à sua rotina com a nossa modalidade 100% online. Acesse as aulas ao vivo, materiais interativos e plataforma de aprendizagem de onde estiver, a qualquer hora. Sem longos deslocamentos, você otimiza seu tempo e se dedica ao aprendizado com total flexibilidade.',
      imagem:
        'https://res.cloudinary.com/dxokgmnnc/image/upload/v1734039276/modalidade-online_u24bbz.jpg',
      alt: 'Modalidade Online',
    },
    {
      titulo: 'Suporte completo para uma jornada de aprendizado impecável.',
      descricao:
        'Acreditamos que uma estrutura completa faz toda a diferença na sua jornada de aprendizado. Por isso, oferecemos suporte online dedicado para tirar dúvidas, plataforma intuitiva com materiais complementares, além de recursos extras como grupos de conversação e monitorias.',
      imagem:
        'https://res.cloudinary.com/dxokgmnnc/image/upload/v1734039245/estrutura-completa_s54gjn.jpg',
      alt: 'Estrutura Completa',
    },
    {
      titulo: 'Certificação reconhecida para impulsionar sua carreira.',
      descricao:
        'Ao concluir o curso, você receberá um certificado de proficiência reconhecido no mercado, comprovando suas habilidades em inglês. Nossa certificação é um diferencial competitivo para alavancar sua carreira, abrir portas para novas oportunidades e alcançar seus objetivos profissionais.',
      imagem:
        'https://res.cloudinary.com/dxokgmnnc/image/upload/v1734039245/certificacao_lq3paz.jpg',
      alt: 'Certificação',
    },
  ];
}
