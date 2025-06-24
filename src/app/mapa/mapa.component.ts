import { Component, Input, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements AfterViewInit {
  @Input() marcadores: { lat: number; lng: number; label?: string }[] = [];

  private mapa: L.Map | undefined;

  ngAfterViewInit(): void {
    this.inicializarMapa();
  }

  private inicializarMapa(): void {
    this.mapa = L.map('mapa').setView([-38.7359, -72.5904], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.mapa);

    if (this.mapa) {
      this.marcadores.forEach(m => {
        L.marker([m.lat, m.lng])
          .addTo(this.mapa!)
          .bindPopup(m.label || 'Sin descripción');
      });
    }
  }
}
