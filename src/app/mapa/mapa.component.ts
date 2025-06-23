import { Component, Input, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements AfterViewInit, OnChanges {
  @Input() marcadores: any[] = [];
  private map: L.Map | undefined;
  private markerGroup: L.LayerGroup = L.layerGroup();

  ngAfterViewInit(): void {
    this.initMap();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['marcadores'] && this.map) {
      this.actualizarMarcadores();
    }
  }

  private initMap(): void {
    this.map = L.map('mapa', {
      center: L.latLng(-38.74, -72.59),
      zoom: 13
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    this.markerGroup.addTo(this.map);
    this.actualizarMarcadores();
  }

  private actualizarMarcadores(): void {
    this.markerGroup.clearLayers();
    if (!this.marcadores) return;

    this.marcadores.forEach(m => {
      if (m.latitud && m.longitud) {
        const marker = L.marker([m.latitud, m.longitud])
          .bindPopup(`<b>ID:</b> ${m.id}<br><b>${m.descripcion || ''}</b>`);
        this.markerGroup.addLayer(marker);
      }
    });
  }
}
