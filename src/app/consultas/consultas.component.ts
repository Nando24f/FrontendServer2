import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlarmasService } from '../services/Alarmas.service';
import { Chart } from 'chart.js/auto';
import { MapaComponent } from '../mapa/mapa.component';

@Component({
  selector: 'app-consultas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.css']
})
export class ConsultasComponent implements OnInit {
  usuarioId: number = 0;
  fechaInicio: string = '';
  fechaFin: string = '';

  alarmasPorUsuario: any[] = [];
  alarmasPorRango: any[] = [];
  alarmasCriticas: any[] = [];
  alarmasResueltas: any[] = [];

  paginaUsuario = 1;
  paginaRango = 1;
  paginaCriticas = 1;
  paginaResueltas = 1;
  tamanio = 5;

  constructor(private alarmasService: AlarmasService) {}

  ngOnInit(): void {}

  consultarPorUsuario(): void {
    if (this.usuarioId > 0) {
      this.alarmasService.getAlarmasPorUsuario(this.usuarioId).subscribe(data => {
        this.alarmasPorUsuario = data;
        this.generarGrafico('graficoUsuario', data);
      });
    }
  }

  consultarPorRango(): void {
    if (this.fechaInicio && this.fechaFin) {
      this.alarmasService.getAlarmasPorRango(this.fechaInicio, this.fechaFin).subscribe(data => {
        this.alarmasPorRango = data;
        this.generarGrafico('graficoRango', data);
      });
    }
  }

  consultarCriticas(): void {
    this.alarmasService.getCriticasNoResueltas().subscribe(data => {
      this.alarmasCriticas = data;
      this.generarGrafico('graficoCriticas', data);
    });
  }

  consultarResueltas(): void {
    this.alarmasService.getResueltasUltimos7Dias().subscribe(data => {
      this.alarmasResueltas = data;
      this.generarGrafico('graficoResueltas', data);
    });
  }

  paginar(arr: any[], pagina: number) {
    const inicio = (pagina - 1) * this.tamanio;
    return arr.slice(inicio, inicio + this.tamanio);
  }

  generarGrafico(canvasId: string, datos: any[]) {
    const conteo: any = {};
    datos.forEach(d => {
      conteo[d.categoria] = (conteo[d.categoria] || 0) + 1;
    });

    const ctx = document.getElementById(canvasId) as HTMLCanvasElement;
    if (ctx) {
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: Object.keys(conteo),
          datasets: [{
            label: 'Cantidad por categoría',
            data: Object.values(conteo),
            backgroundColor: 'rgba(54, 162, 235, 0.6)'
          }]
        }
      });
    }
  }
}
