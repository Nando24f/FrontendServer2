import { Component, OnInit } from '@angular/core';
import { AlarmasService } from '../services/Alarmas.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alarmas',
  templateUrl: './alarmas.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./alarmas.component.css']
})
export class AlarmasComponent implements OnInit {
  alarmasActivas: any[] = [];
  alarmasMapa: any[] = [];

  paginaActivas = 1;
  paginaMapa = 1;
  tamanio = 5;

  constructor(private alarmasService: AlarmasService) {}

  ngOnInit(): void {
    this.alarmasService.getUltimasAlarmasActivas().subscribe(data => {
      this.alarmasActivas = data;
    });

    this.alarmasService.getAlarmasConUbicacion().subscribe(data => {
      this.alarmasMapa = data;
    });
  }

  paginar(array: any[], pagina: number): any[] {
    const inicio = (pagina - 1) * this.tamanio;
    return array.slice(inicio, inicio + this.tamanio);
  }

  siguienteActivas(): void {
    if (this.paginaActivas * this.tamanio < this.alarmasActivas.length) {
      this.paginaActivas++;
    }
  }

  anteriorActivas(): void {
    if (this.paginaActivas > 1) {
      this.paginaActivas--;
    }
  }

  siguienteMapa(): void {
    if (this.paginaMapa * this.tamanio < this.alarmasMapa.length) {
      this.paginaMapa++;
    }
  }

  anteriorMapa(): void {
    if (this.paginaMapa > 1) {
      this.paginaMapa--;
    }
  }
}
