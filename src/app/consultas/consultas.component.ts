
import { Component } from '@angular/core';
import { AlarmasService } from '../services/Alarmas.service';

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.css']
})
export class ConsultasComponent {
  usuarioId: number = 0;
  fechaInicio: string = '';
  fechaFin: string = '';

  alarmasPorUsuario: any[] = [];
  alarmasPorRango: any[] = [];
  criticas: any[] = [];
  resueltas: any[] = [];

  constructor(private alarmasService: AlarmasService) {}

  consultarPorUsuario() {
    this.alarmasService.getAlarmasPorUsuario(this.usuarioId).subscribe(data => {
      this.alarmasPorUsuario = data;
    });
  }

  consultarPorRango() {
    this.alarmasService.getAlarmasPorRango(this.fechaInicio, this.fechaFin).subscribe(data => {
      this.alarmasPorRango = data;
    });
  }

  consultarCriticas() {
    this.alarmasService.getCriticasNoResueltas().subscribe(data => {
      this.criticas = data;
    });
  }

  consultarResueltas() {
    this.alarmasService.getResueltasUltimos7Dias().subscribe(data => {
      this.resueltas = data;
    });
  }
}
