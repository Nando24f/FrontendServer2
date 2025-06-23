import { Component, Input } from '@angular/core';
declare let L: any;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent {
  @Input() marcadores: any[] = [];
}
