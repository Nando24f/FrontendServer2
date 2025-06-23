import { Component, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

declare const google: any;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements AfterViewInit {
  @Input() marcadores: any[] = [];
  @ViewChild('mapElement', { static: false }) mapElement!: ElementRef;

  ngAfterViewInit(): void {
  if (typeof google !== 'undefined') {
    const map = new google.maps.Map(this.mapElement.nativeElement, {
      center: { lat: -38.7359, lng: -72.5904 },
      zoom: 12
    });
  } else {
    console.error('Google Maps API no está cargado todavía');
  }
}

}
