import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ContatoService } from '../../services/contato.service';

@Component({
  selector: 'app-mapa',
  standalone: true,
  templateUrl: `./mapa.component.html`,
  styleUrl: `./mapa.component.css`,
})
export class MapaComponent implements AfterViewInit {
  googleMapsApiKey!: string;
  @ViewChild('mapaContainer', { static: true }) mapaContainer!: ElementRef;

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private contatoService: ContatoService
  ) {}

  ngAfterViewInit(): void {
    this.contatoService.getGoogleMapsApiKey().subscribe((data) => {
      this.googleMapsApiKey = data.apiKey;
      this.carregarAPI();
    });
  }

  private carregarAPI(): void {
    if (isPlatformBrowser(this.platformId)) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${this.googleMapsApiKey}`;
      document.body.appendChild(script);
      (window as any).inicializarMapa = this.inicializarMapa.bind(this);
    }

    // Define a função de callback globalmente
  }

  private inicializarMapa(): void {
    const googleMaps = (window as any).google.maps;
    // Cria o mapa diretamente, sem declarar 'google':
    const mapa = new googleMaps.Map(this.mapaContainer.nativeElement, {
      center: { lat: -23.5606, lng: -46.6576 },
      zoom: 15,
      styles: [
        { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
        { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
        { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
        {
          featureType: 'administrative.locality',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#d59563' }],
        },
        {
          featureType: 'poi',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#d59563' }],
        },
        {
          featureType: 'poi.park',
          elementType: 'geometry',
          stylers: [{ color: '#263c3f' }],
        },
        {
          featureType: 'poi.park',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#6b9a76' }],
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [{ color: '#38414e' }],
        },
        {
          featureType: 'road',
          elementType: 'geometry.stroke',
          stylers: [{ color: '#212a37' }],
        },
        {
          featureType: 'road',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#9ca5b3' }],
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry',
          stylers: [{ color: '#746855' }],
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [{ color: '#1f2835' }],
        },
        {
          featureType: 'road.highway',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#f3d19c' }],
        },
        {
          featureType: 'transit',
          elementType: 'geometry',
          stylers: [{ color: '#2f3948' }],
        },
        {
          featureType: 'transit.station',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#d59563' }],
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{ color: '#17263c' }],
        },
        {
          featureType: 'water',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#515c6d' }],
        },
        {
          featureType: 'water',
          elementType: 'labels.text.stroke',
          stylers: [{ color: '#17263c' }],
        },
      ],
    });

    new googleMaps.Marker({
      position: { lat: -23.5606, lng: -46.6576 },
      map: mapa,
      title: 'Keystone English',
    });
  }
}
