import { Component, OnInit } from '@angular/core';
import { AlarmasService } from '../services/Alarmas.service';
import { CommonModule } from '@angular/common';
import { Chart } from 'chart.js';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  imports: [CommonModule,ChartModule],
  standalone: true,
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {
  datos: any;
  opciones: any;

  constructor(private alarmasService: AlarmasService) {}

  ngOnInit(): void {
    this.alarmasService.getConteoPorEstado().subscribe({
      next: (res) => {
        const labels = res.map((e: any) => e.estado);
        const valores = res.map((e: any) => e.total);

        this.datos = {
          labels,
          datasets: [{
            data: valores,
            backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726', '#FF6384']
          }]
        };

        this.opciones = {
          responsive: true,
          maintainAspectRatio: false
        };
      },
      error: (err) => console.error('Error al cargar estadísticas:', err)
    });
  }
}
