// employee.component.ts
import { Component, OnInit } from '@angular/core';
import { ManagerService } from '../services/manager.service';
import { FormsModule } from '@angular/forms';
import { ChartModule } from 'primeng/chart';
import { CommonModule } from '@angular/common';

interface Resident {
  id: number;
  nombre: string;
  apellido: string;
  direccion: string;
  calle: string;
  numero_casa: string;
  rut: string;
  sexo: 'Masculino' | 'Femenino';
}

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  standalone: true,
  imports: [FormsModule, ChartModule, CommonModule]
  
})
export class EmployeeComponent implements OnInit {
  
  calles: any[] = [];         // o usa una interfaz/tipo adecuado
  vecinos: any[] = [];        // o usa una interfaz/tipo adecuado
  selectedCalle: any = null;  // o usa un tipo específico
  chartOptions: any;          // o usa el tipo correcto de primeng

  // Resto del código del componente

  residents: Resident[] = [];
  filteredResidents: Resident[] = [];
  streets: string[] = [
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
  selectedStreet: string = this.streets[0];
  loading: boolean = false;
  
  // Estadísticas
  totalResidents: number = 0;
  maleCount: number = 0;
  femaleCount: number = 0;
  
  // Datos para gráfico
  chartData: any;
  chartOptions: any;

  constructor(private managerService: ManagerService) {}

  ngOnInit(): void {
    this.initChartOptions();
    this.loadResidents();
  }

  initChartOptions(): void {
    this.chartOptions = {
      responsive: true,
      plugins: {
        legend: { position: 'top' },
        title: { display: true, text: 'Distribución por Género' }
      }
    };
  }

  loadResidents(): void {
    this.loading = true;
    this.managerService.getVecinos().subscribe({
      next: (data) => {
        this.residents = data;
        this.filterByStreet();
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading residents:', err);
        this.loading = false;
      }
    });
  }

  filterByStreet(): void {
    this.filteredResidents = this.residents.filter(resident => 
      resident.calle === this.selectedStreet
    );
    
    this.calculateStatistics();
    this.updateChartData();
  }

  calculateStatistics(): void {
    this.totalResidents = this.filteredResidents.length;
    this.maleCount = this.filteredResidents.filter(r => r.sexo === 'Masculino').length;
    this.femaleCount = this.totalResidents - this.maleCount;
  }

  updateChartData(): void {
    this.chartData = {
      labels: ['Hombres', 'Mujeres'],
      datasets: [{
        data: [this.maleCount, this.femaleCount],
        backgroundColor: ['#36A2EB', '#FF6384'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384']
      }]
    };
  }

  onStreetChange(): void {
    this.filterByStreet();
  }
}