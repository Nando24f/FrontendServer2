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

interface Estadisticas {
  totalVecinos: number;
  totalHombres: number;
  totalMujeres: number;
  totalAlarmas: number;
  hombresAlarmas: number;
  mujeresAlarmas: number;
  porcentajeHombres: number;
  porcentajeMujeres: number;
}

interface EstadisticasCalle {
  totalVecinos: number;
  totalHombres: number;
  totalMujeres: number;
}

interface VecinosPorCalle {
  calle: string;
  cantidad: number;
}

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  standalone: true,
  imports: [FormsModule, ChartModule, CommonModule]
})
export class EmployeeComponent implements OnInit {
  // Datos generales
  estadisticas: Estadisticas = {
    totalVecinos: 0,
    totalHombres: 0,
    totalMujeres: 0,
    totalAlarmas: 0,
    hombresAlarmas: 0,
    mujeresAlarmas: 0,
    porcentajeHombres: 0,
    porcentajeMujeres: 0
  };

  // Datos por calle
  selectedCalle: string | null = null;
  calles: string[] = [
    'Avenida Primavera',
    'Calle 1',
    'Calle 2',
    'Calle 3',
    'Calle 4',
    'Calle 5',
    'Calle 6',
    'Calle 7',
    'Calle 8',
    'Calle 9'
  ];
  estadisticasCalle: EstadisticasCalle = {
    totalVecinos: 0,
    totalHombres: 0,
    totalMujeres: 0
  };

  // Listas
  vecinos: Vecino[] = [];
  administradores: Vecino[] = [];
  alarmas: Alarma[] = [];

  // UI
  loading: boolean = false;
  chartData: any = {};
  chartOptions: any;
  chartDataPorCalle: any = {};
  chartOptionsPorCalle: any;

  constructor(
    private http: HttpClient,
    private managerService: ManagerService
  ) { }

  ngOnInit(): void {
    this.initChartOptions();
    this.initChartOptionsPorCalle();
    this.fetchAllData();
    this.selectedCalle = this.calles[0];
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
              const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
              const percentage = Math.round((value / total) * 100);
              return `${label}: ${value} (${percentage}%)`;
            }
          }
        }
      }
    };
  }

  initChartOptionsPorCalle(): void {
    this.chartOptionsPorCalle = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label: (context: any) => {
              return `${context.label}: ${context.raw} vecinos`;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Cantidad de Vecinos'
          }
        },
        x: {
          title: {
            display: true,
            text: 'Calles'
          }
        }
      }
    };
  }

  fetchAllData(): void {
    this.loading = true;

    // 1. Obtener calles (complementar con las que ya tenemos)
    this.managerService.getCalles().subscribe({
      next: (calles) => {
        if (calles && calles.length > 0) {
          const callesUnicas = [...new Set([...this.calles, ...calles])];
          this.calles = callesUnicas;
        }
      },
      error: (err) => console.error('Error fetching calles:', err)
    });

    // 2. Obtener vecinos (no administradores)
    this.managerService.getVecinos().subscribe({
      next: (vecinos) => {
        this.vecinos = vecinos;
        this.estadisticas.totalVecinos = vecinos.length;
      },
      error: (err) => console.error('Error fetching vecinos:', err)
    });

    // 3. Obtener administradores
    this.managerService.getAdministradores().subscribe({
      next: (administradores) => {
        this.administradores = administradores;
      },
      error: (err) => console.error('Error fetching administradores:', err)
    });

    // 4. Obtener alarmas
    this.managerService.getAlarmas().subscribe({
      next: (alarmas) => {
        this.alarmas = alarmas;
        this.estadisticas.totalAlarmas = alarmas.length;
      },
      error: (err) => console.error('Error fetching alarmas:', err)
    });

    // 5. Obtener cantidad de hombres
    this.managerService.getCantidadHombres().subscribe({
      next: (data) => {
        this.estadisticas.totalHombres = data[0]?.cantidad_hombres || 0;
        this.updateChartData();
      },
      error: (err) => console.error('Error fetching cantidad hombres:', err)
    });

    // 6. Obtener cantidad de mujeres
    this.managerService.getCantidadMujeres().subscribe({
      next: (data) => {
        this.estadisticas.totalMujeres = data[0]?.cantidad_mujeres || 0;
        this.updateChartData();
      },
      error: (err) => console.error('Error fetching cantidad mujeres:', err)
    });

    // 7. Obtener porcentaje hombres con alarmas
    this.managerService.getPorcentajeHombresAlarmas().subscribe({
      next: (data) => {
        this.estadisticas.porcentajeHombres = data[0]?.porcentaje_hombres || 0;
      },
      error: (err) => console.error('Error fetching porcentaje hombres:', err)
    });

    // 8. Obtener porcentaje mujeres con alarmas
    this.managerService.getPorcentajeMujeresAlarmas().subscribe({
      next: (data) => {
        this.estadisticas.porcentajeMujeres = data[0]?.porcentaje_mujeres || 0;
      },
      error: (err) => console.error('Error fetching porcentaje mujeres:', err)
    });

    // 9. Obtener distribución por calles
    this.managerService.getVecinosPorCalle('all').subscribe({ // Or whatever parameter you need
      next: (data: VecinosPorCalle[]) => {
        this.updateChartDataPorCalle(data);
      },
      error: (err) => console.error('Error fetching vecinos por calle:', err)
    });

    // Finalizar carga
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

  updateChartData(): void {
    this.chartData = {
      labels: ['Hombres', 'Mujeres'],
      datasets: [{
        data: [this.estadisticas.totalHombres, this.estadisticas.totalMujeres],
        backgroundColor: ['#4285F4', '#34A853'],
        borderWidth: 0
      }]
    };
  }

  updateChartDataPorCalle(data: VecinosPorCalle[]): void {
    const sortedData = [...data].sort((a, b) => b.cantidad - a.cantidad).slice(0, 10);

    this.chartDataPorCalle = {
      labels: sortedData.map(item => item.calle),
      datasets: [{
        label: 'Vecinos por Calle',
        data: sortedData.map(item => item.cantidad),
        backgroundColor: '#3498db',
        borderColor: '#2980b9',
        borderWidth: 1
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
        this.estadisticasCalle.totalVecinos = data[0]?.cantidad_vecinos || 0;
      },
      error: (err) => console.error('Error fetching vecinos por calle:', err)
    });

    this.managerService.getHombresPorCalle(this.selectedCalle).subscribe({
      next: (data) => {
        this.estadisticasCalle.totalHombres = data[0]?.cantidad_hombres || 0;
      },
      error: (err) => console.error('Error fetching hombres por calle:', err)
    });

    this.managerService.getMujeresPorCalle(this.selectedCalle).subscribe({
      next: (data) => {
        this.estadisticasCalle.totalMujeres = data[0]?.cantidad_mujeres || 0;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching mujeres por calle:', err);
        this.loading = false;
      }
    });
  }
}