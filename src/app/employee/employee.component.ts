import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ChartModule } from 'primeng/chart';
import { CommonModule } from '@angular/common';
import { ManagerService } from '../services/manager.service';

interface Vecino {
  id: number;
  nombre: string;
  apellido: string;
  fecha_nacimiento: string;
  direccion: string;
  numero_casa: string;
  rut: string;
  sexo: string;
}

interface Alarma {
  id: number;
  nombre: string;
  apellido: string;
  direccion_usuario: string;
  fecha: string;
  hora: string;
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
  selectedCalle: string | null = null;
  calles: string[] = [];
  alarmas: Alarma[] = [];
  porcentajeHombres: number = 0;
  cantidadHombres: number = 0;
  loading: boolean = false;
  chartData: any;
  chartOptions: any;

  constructor(
    private http: HttpClient,
    private managerService: ManagerService
  ) { }

  ngOnInit(): void {
    this.initChartOptions();
    this.fetchCalles();
    this.fetchVecinos();
    this.fetchAlarmas();
    this.fetchEstadisticas();
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
              return `${label}: ${value}`;
            }
          }
        }
      }
    };
  }

  fetchCalles(): void {
    this.managerService.getCalles().subscribe({
      next: (data) => {
        this.calles = data;
        if (data.length > 0) {
          this.selectedCalle = data[0];
        }
      },
      error: (err) => console.error('Error fetching calles:', err)
    });
  }

  fetchVecinos(): void {
    this.managerService.getVecinos().subscribe({
      next: (data) => {
        this.vecinos = data;
      },
      error: (err) => console.error('Error fetching vecinos:', err)
    });
  }

  fetchAlarmas(): void {
    this.managerService.getAlarmas().subscribe({
      next: (data) => {
        this.alarmas = data;
      },
      error: (err) => console.error('Error fetching alarmas:', err)
    });
  }

  fetchEstadisticas(): void {
    this.managerService.getPorcentajeHombresAlarmas().subscribe({
      next: (data) => {
        this.porcentajeHombres = data[0]?.porcentaje_hombres || 0;
      },
      error: (err) => console.error('Error fetching porcentaje:', err)
    });

    this.managerService.getCantidadHombres().subscribe({
      next: (data) => {
        this.cantidadHombres = data[0]?.cantidad_hombres || 0;
        this.updateChartData();
      },
      error: (err) => console.error('Error fetching cantidad:', err)
    });
  }

  updateChartData(): void {
    this.chartData = {
      labels: ['Hombres', 'Mujeres'],
      datasets: [{
        data: [this.cantidadHombres, 100 - this.cantidadHombres], // Ajustar según tus datos reales
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
    this.loading = true;
    this.managerService.getVecinosPorCalle(this.selectedCalle).subscribe({
      next: (data) => {
        this.vecinos = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error:', err);
        this.loading = false;
      }
    });
  }
}