import { Component, Input, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements AfterViewInit {
  @Input() marcadores: any[] = [];

  private map!: L.Map;

  ngAfterViewInit(): void {
    this.inicializarMapa();
    this.agregarMarcadores();
  }

  private inicializarMapa(): void {
    this.map = L.map('mapa').setView([-38.7359, -72.5904], 8);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);
  }

  private agregarMarcadores(): void {
    if (!this.map) return;

    this.marcadores.forEach((m) => {
      if (m.latitud && m.longitud) {
        L.marker([m.latitud, m.longitud])
          .addTo(this.map)
          .bindPopup(`<strong>${m.categoria || 'Alarma'}</strong><br>Usuario: ${m.autor || 'N/A'}`);
      }
    });
  }
}
