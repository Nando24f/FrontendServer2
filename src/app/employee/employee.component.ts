import { Component, OnInit } from '@angular/core';
import { AlarmasService } from '../services/Alarmas.service';
import { ChartModule } from 'primeng/chart';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  standalone: true,
  imports: [ChartModule, CommonModule]
})
export class EmployeeComponent implements OnInit {
  // Datos alineados con lo que realmente devuelve tu backend
  ultimasAlarmas: any[] = [];
  alarmasMapa: any[] = [];
  estadisticas: any = {};
  
  // Gráficos
  chartData: any;
  chartOptions: any;

  constructor(private alarmasService: AlarmasService) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    // 1. Cargar últimas alarmas activas (QUERY_1)
    this.alarmasService.getUltimasAlarmasActivas().subscribe({
      next: (data) => this.ultimasAlarmas = data,
      error: (err) => console.error('Error al cargar alarmas activas:', err)
    });

    // 2. Cargar alarmas para mapa (QUERY_2)
    this.alarmasService.getAlarmasConUbicacion().subscribe({
      next: (data) => this.alarmasMapa = data,
      error: (err) => console.error('Error al cargar alarmas con ubicación:', err)
    });

    // 3. Cargar estadísticas por estado (QUERY_6)
    this.alarmasService.getConteoPorEstado().subscribe({
      next: (data) => {
        this.estadisticas.porEstado = data;
        this.configurarGraficoEstados(data);
      },
      error: (err) => console.error('Error al cargar estadísticas por estado:', err)
    });

    // 4. Cargar alarmas críticas (QUERY_9)
    this.alarmasService.getCriticasNoResueltas().subscribe({
      next: (data) => this.estadisticas.criticas = data.length,
      error: (err) => console.error('Error al cargar alarmas críticas:', err)
    });
  }

  configurarGraficoEstados(datos: any[]): void {
    this.chartData = {
      labels: datos.map(item => item.estado),
      datasets: [{
        data: datos.map(item => item.total),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
      }]
    };

    this.chartOptions = {
      responsive: true,
      plugins: {
        legend: { position: 'top' },
        tooltip: { callbacks: { label: (ctx: any) => `${ctx.label}: ${ctx.raw}` } }
      }
    };
  }
}