import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-mapa',
  standalone: true,
  templateUrl: `./mapa.component.html`,
  styleUrl: `./mapa.component.css`,
})
export class MapaComponent implements AfterViewInit {
  @ViewChild('mapaContainer', { static: true }) mapaContainer!: ElementRef;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngAfterViewInit(): void {
    this.carregarAPI();
  }

  private carregarAPI(): void {
    if (isPlatformBrowser(this.platformId)) {
      const apiKey = environment.googleMapsApiKey;
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=inicializarMapa&loading=async`;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      (window as any).inicializarMapa = this.inicializarMapa.bind(this);
    }

    // Define a função de callback globalmente
  }

  private inicializarMapa(): void {
    const googleMaps = (window as any).google.maps;
    // Crie o mapa diretamente, sem declarar 'google':
    const mapa = new googleMaps.Map(this.mapaContainer.nativeElement, {
      center: { lat: -23.5489, lng: -46.6388 },
      zoom: 15,
    });

    new googleMaps.Marker({
      position: { lat: -23.5489, lng: -46.6388 },
      map: mapa,
      title: 'Keystone English',
    });
  }
}
