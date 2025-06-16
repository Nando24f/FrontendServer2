import { Component, OnInit } from '@angular/core';
import { ManagerService } from '../services/manager.service';
import { ChartModule } from 'primeng/chart';
import { CommonModule } from '@angular/common';

interface Alarma {
  id: number;
  nombre: string;
  apellido: string;
  categoria: string;
  prioridad: string;
  estado: string;
  fecha: string;
  hora: string;
  latitud?: number;
  longitud?: number;
}

interface Estadisticas {
  totalAlarmas: number;
  alarmasActivas: number;
  alarmasResueltas: number;
  alarmasCriticas: number;
}

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  standalone: true,
  imports: [ChartModule, CommonModule]
})
export class EmployeeComponent implements OnInit {
  ultimasAlarmas: Alarma[] = [];
  alarmasMapa: Alarma[] = [];
  estadisticas: Estadisticas = {
    totalAlarmas: 0,
    alarmasActivas: 0,
    alarmasResueltas: 0,
    alarmasCriticas: 0
  };
  loading = true;

  // Datos para gráficos
  chartData: any;
  chartOptions: any;

  constructor(private ManagerService: ManagerService) {}

  ngOnInit(): void {
    this.initChartOptions();
    this.loadData();
  }

  initChartOptions(): void {
    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
        },
        tooltip: {
          callbacks: {
            label: (context: any) => {
              return `${context.label}: ${context.raw}`;
            }
          }
        }
      }
    };
  }

  loadData(): void {
    // Cargar últimas alarmas activas
    this.ManagerService.getUltimasAlarmasActivas().subscribe({
      next: (data) => {
        this.ultimasAlarmas = data;
        this.estadisticas.alarmasActivas = data.length;
      },
      error: (err) => console.error('Error al cargar alarmas activas:', err)
    });

    // Cargar alarmas para mapa
    this.ManagerService.getAlarmasConUbicacion().subscribe({
      next: (data) => {
        this.alarmasMapa = data;
      },
      error: (err) => console.error('Error al cargar alarmas para mapa:', err)
    });

    // Cargar estadísticas generales
    this.ManagerService.getConteoPorEstado().subscribe({
      next: (data) => {
        this.estadisticas.totalAlarmas = data.reduce((acc, item) => acc + item.total, 0);
        this.estadisticas.alarmasResueltas = data.find((e: any) => e.estado === 'resuelta')?.total || 0;
        this.updateChartData(data);
      },
      error: (err) => console.error('Error al cargar estadísticas por estado:', err)
    });

    // Cargar alarmas críticas
    this.ManagerService.getCriticasNoResueltas().subscribe({
      next: (data) => {
        this.estadisticas.alarmasCriticas = data.length;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar alarmas críticas:', err);
        this.loading = false;
      }
    });
  }

  updateChartData(estadosData: any[]): void {
    this.chartData = {
      labels: estadosData.map((item: any) => item.estado),
      datasets: [{
        data: estadosData.map((item: any) => item.total),
        backgroundColor: [
          '#FF6384', // Pendiente
          '#36A2EB', // En proceso
          '#4BC0C0'  // Resuelta
        ],
        borderWidth: 0
      }]
    };
  }
}