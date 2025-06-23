import { Component, Input, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements AfterViewInit {
  @Input() marcadores: any[] = [];

  private mapa: L.Map | undefined;

  ngAfterViewInit(): void {
    this.mapa = L.map('mapa-container').setView([-38.7359, -72.5904], 13); // Centro en Temuco aprox.

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.mapa);

    this.actualizarMarcadores();
  }

  private actualizarMarcadores(): void {
    if (!this.mapa || !this.marcadores) return;

    this.marcadores.forEach((m: any) => {
      if (m.latitud && m.longitud) {
        L.marker([m.latitud, m.longitud]).addTo(this.mapa!)
          .bindPopup(`<b>${m.categoria || 'Alarma'}</b><br>${m.descripcion || ''}`);

        }
    });
  }
}
