import { Component, Input, AfterViewInit } from '@angular/core';

declare const google: any;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements AfterViewInit {
  @Input() marcadores: any[] = [];

  ngAfterViewInit(): void {
    const map = new google.maps.Map(document.getElementById("mapa"), {
      center: { lat: -38.7359, lng: -72.5904 },
      zoom: 11
    });

    this.marcadores.forEach(m => {
      new google.maps.Marker({
        position: { lat: m.lat, lng: m.lng },
        map,
        title: m.titulo
      });
    });
  }
}
