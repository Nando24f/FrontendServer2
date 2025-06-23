import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-mapa',
  standalone: true,
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent {
  @Input() marcadores: any[] = [];
}
