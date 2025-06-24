import { Component, OnInit } from '@angular/core';
import { AlarmasService } from '../services/Alarmas.service';
import { CommonModule } from '@angular/common';
import { MapaComponent } from '../mapa/mapa.component';

@Component({
  selector: 'app-alarmas',
  templateUrl: './alarmas.component.html',
  standalone: true,
  imports: [CommonModule, MapaComponent],
  styleUrls: ['./alarmas.component.css']
})
export class AlarmasComponent implements OnInit {
  alarmasActivas: any[] = [];
  alarmasMapa: any[] = [];

  constructor(private alarmasService: AlarmasService) {}

  get marcadoresMapa() {
    return this.alarmasMapa.map((a: any) => ({
      lat: a.latitud,
      lng: a.longitud,
      label: `${a.descripcion_evento}`
    }));
  }

  ngOnInit(): void {
    this.alarmasService.getAlarmasCriticas().subscribe((data: any[]) => {
      this.alarmasActivas = data;
    });

    this.alarmasService.getAlarmasConUbicacion().subscribe((data: any[]) => {
      this.alarmasMapa = data;
    });
  }
}
