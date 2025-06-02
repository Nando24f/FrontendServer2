// employee.component.ts
import { Component, OnInit } from '@angular/core';
import { ManagerService } from '../services/manager.service';
import { FormsModule } from '@angular/forms';
import { ChartModule } from 'primeng/chart';  
import { CommonModule } from '@angular/common';

interface Vecino {
  id: number;
  nombre: string;
  apellido: string;
  fecha_nacimiento: string;
  direccion: string;
  numero_casa: string;
  rut: string;
  sexo: string;
  calle?: string;
}

interface Alarma {
  id: number;
  nombre: string;
  apellido: string;
  direccion_usuario: string;
  fecha: string;
  hora: string;
}

interface Estadisticas {
  porcentajeHombres: number;
  cantidadHombres: number;
  cantidadMujeres: number;
}

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  standalone: true,
  imports: [FormsModule, ChartModule, CommonModule]
})
export class EmployeeComponent implements OnInit {
  vecinos: Vecino[] = [];
  vecinosFiltrados: Vecino[] = [];
  selectedCalle: string | null = null;
  calles: string[] = [];
  alarmas: Alarma[] = [];
  alarmasFiltradas: Alarma[] = [];
  estadisticas: Estadisticas = {
    porcentajeHombres: 0,
    cantidadHombres: 0,
    cantidadMujeres: 0
  };
  loading: boolean = false;
  chartData: any;
  chartOptions: any;

  constructor(private managerService: ManagerService) { }

  ngOnInit(): void {
    this.initChartOptions();
    this.loadInitialData();
  }

  private loadInitialData(): void {
    this.loading = true;
    
    // Cargar calles
    this.managerService.getCalles().subscribe({
      next: (calles) => {
        this.calles = calles;
        if (calles.length > 0) {
          this.selectedCalle = calles[0];
        }
      },
      error: (err) => console.error('Error fetching calles:', err)
    });

    // Cargar vecinos
    this.managerService.getVecinos().subscribe({
      next: (vecinos) => {
        this.vecinos = vecinos;
        this.filtrarDatosPorCalle();
      },
      error: (err) => console.error('Error fetching vecinos:', err)
    });

    // Cargar alarmas
    this.managerService.getAlarmas().subscribe({
      next: (alarmas) => {
        this.alarmas = alarmas;
        this.filtrarDatosPorCalle();
      },
      error: (err) => console.error('Error fetching alarmas:', err)
    });

    // Cargar estadísticas
    this.managerService.getPorcentajeHombresAlarmas().subscribe({
      next: (data) => {
        this.estadisticas.porcentajeHombres = data[0]?.porcentaje_hombres || 0;
      },
      error: (err) => console.error('Error fetching porcentaje:', err)
    });

    this.managerService.getCantidadHombres().subscribe({
      next: (data) => {
        this.estadisticas.cantidadHombres = data[0]?.cantidad_hombres || 0;
        this.updateChartData();
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching cantidad:', err);
        this.loading = false;
      }
    });
  }

  private filtrarDatosPorCalle(): void {
    if (!this.selectedCalle) return;

    // Filtrar vecinos
    this.vecinosFiltrados = this.vecinos.filter(v => 
      v.direccion.includes(this.selectedCalle!) || 
      v.calle === this.selectedCalle
    );

    // Filtrar alarmas
    this.alarmasFiltradas = this.alarmas.filter(a => 
      a.direccion_usuario.includes(this.selectedCalle!)
    );

    // Actualizar estadísticas si hay vecinos filtrados
    if (this.vecinosFiltrados.length > 0) {
      const totalHombres = this.vecinosFiltrados.filter(v => v.sexo === 'Masculino').length;
      this.estadisticas.cantidadHombres = totalHombres;
      this.estadisticas.cantidadMujeres = this.vecinosFiltrados.length - totalHombres;
      this.updateChartData();
    }
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
              const label = context.label || '';
              const value = context.raw || 0;
              return `${label}: ${value} (${((value / this.vecinosFiltrados.length) * 100).toFixed(1)}%)`;
            }
          }
        }
      }
    };
  }

  updateChartData(): void {
    this.chartData = {
      labels: ['Hombres', 'Mujeres'],
      datasets: [{
        data: [this.estadisticas.cantidadHombres, this.estadisticas.cantidadMujeres],
        backgroundColor: ['#4285F4', '#34A853'],
        borderWidth: 0
      }]
    };
  }

  onSearch(): void {
    if (!this.selectedCalle) {
      alert('Por favor selecciona una calle');
      return;
    }
    this.filtrarDatosPorCalle();
  }
}