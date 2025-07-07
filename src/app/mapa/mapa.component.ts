import { Component, Input, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements AfterViewInit, OnChanges {
  @Input() marcadores: any[] = [];

  private map!: L.Map;
  private capaMarcadores!: L.LayerGroup;

  ngAfterViewInit(): void {
    this.inicializarMapa();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.map && changes['marcadores']) {
      this.actualizarMarcadores();
    }
  }

  private inicializarMapa(): void {
    this.map = L.map('mapa').setView([-38.7359, -72.5904], 9);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    this.capaMarcadores = L.layerGroup().addTo(this.map);

    this.actualizarMarcadores(); // por si marcadores ya están cargados al inicio
  }

  private actualizarMarcadores(): void {
    if (!this.capaMarcadores) return;

    this.capaMarcadores.clearLayers();

    console.log('Marcadores recibidos:', this.marcadores);

    this.marcadores.forEach((m) => {
      if (m.latitud && m.longitud) {
        const popupContent = `
          <strong>ID:</strong> ${m.id || 'N/A'}<br>
          <strong>Categoría:</strong> ${m.categoria || 'N/A'}<br>
          <strong>Descripción:</strong> ${m.descripcion || 'Sin descripción'}<br>
          <strong>Fecha:</strong> ${m.fecha ? new Date(m.fecha).toLocaleString() : 'N/A'}<br>
          <strong>Autor:</strong> ${m.autor || 'N/A'}
        `;

        const marker = L.marker([m.latitud, m.longitud]).bindPopup(popupContent);
        marker.addTo(this.capaMarcadores);
      }
    });

    // Zoom automático si hay al menos un marcador
    const primer = this.marcadores.find(m => m.latitud && m.longitud);
    if (primer) {
      this.map.setView([primer.latitud, primer.longitud], 11);
    }
  }
}
