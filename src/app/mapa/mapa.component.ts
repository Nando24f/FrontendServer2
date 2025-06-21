import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector: 'app-mapa',
  standalone: true,
  imports: [CommonModule, GoogleMapsModule],
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {
  @Input() marcadores: { lat: number, lng: number, label?: string }[] = [];

  center = { lat: -38.7359, lng: -72.5904 }; // Temuco por defecto
  zoom = 12;

  ngOnInit(): void {
    if (this.marcadores.length > 0) {
      this.center = {
        lat: this.marcadores[0].lat,
        lng: this.marcadores[0].lng
      };
    }
  }
}
