import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlarmasService } from '../services/Alarmas.service';

@Component({
  selector: 'app-consultas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.css']
})
export class ConsultasComponent {
  usuarioId = 0;
  fechaInicio = '';
  fechaFin = '';

  alarmasPorUsuario: any[] = [];
  alarmasPorRango: any[] = [];
  alarmasCriticas: any[] = [];
  alarmasResueltas: any[] = [];

  tamanio = 5;
  paginaUsuario = 1;
  paginaRango = 1;
  paginaCriticas = 1;
  paginaResueltas = 1;

  constructor(private alarmasService: AlarmasService) {}

  paginar(arr: any[], pagina: number) {
    const inicio = (pagina - 1) * this.tamanio;
    return arr.slice(inicio, inicio + this.tamanio);
  }

  consultarPorUsuario() {
    this.paginaUsuario = 1;
    this.alarmasService.getAlarmasPorUsuario(this.usuarioId).subscribe(data => {
      this.alarmasPorUsuario = data;
    });
  }

  consultarPorRango() {
    this.paginaRango = 1;
    this.alarmasService.getAlarmasPorRango(this.fechaInicio, this.fechaFin).subscribe(data => {
      this.alarmasPorRango = data;
    });
  }

  consultarCriticas() {
    this.paginaCriticas = 1;
    this.alarmasService.getCriticasNoResueltas().subscribe(data => {
      this.alarmasCriticas = data;
    });
  }

  consultarResueltas() {
    this.paginaResueltas = 1;
    this.alarmasService.getResueltasUltimos7Dias().subscribe(data => {
      this.alarmasResueltas = data;
    });
  }
  anteriorUsuario() { this.paginaUsuario--; }
siguienteUsuario() { this.paginaUsuario++; }

anteriorRango() { this.paginaRango--; }
siguienteRango() { this.paginaRango++; }

anteriorCriticas() { this.paginaCriticas--; }
siguienteCriticas() { this.paginaCriticas++; }

anteriorResueltas() { this.paginaResueltas--; }
siguienteResueltas() { this.paginaResueltas++; }
}