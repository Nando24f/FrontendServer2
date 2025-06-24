import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-mapa',
  template: '<div id="mapa" style="height: 100%; width: 100%"></div>',
  standalone: true
})
export class MapaComponent implements OnChanges {
  @Input() marcadores: any[] = [];

  private mapa: any;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['marcadores']) {
      this.cargarMapa();
    }
  }

  private cargarMapa(): void {
    if (!this.mapa) {
      this.mapa = L.map('mapa').setView([-38.7359, -72.5904], 13); // Temuco

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(this.mapa);
    }

    this.mapa.eachLayer((layer: any) => {
      if (layer instanceof L.Marker) this.mapa.removeLayer(layer);
    });

    this.marcadores.forEach((alarma) => {
      if (alarma.latitud && alarma.longitud) {
        L.marker([alarma.latitud, alarma.longitud])
          .addTo(this.mapa)
          .bindPopup(`
            <strong>${alarma.categoria}</strong><br>
            ${alarma.descripcion || 'Sin descripción'}<br>
            Fecha: ${alarma.fecha}<br>
            Usuario: ${alarma.usuarioId}
          `);
      }
    });
  }
}
