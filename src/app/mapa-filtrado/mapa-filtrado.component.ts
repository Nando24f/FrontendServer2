import { Component, OnInit } from '@angular/core';
import { AlarmasService } from '../services/Alarmas.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MapaComponent } from '../mapa/mapa.component';

@Component({
  selector: 'app-mapa-filtrado',
  imports: [CommonModule, FormsModule, MapaComponent],
  templateUrl: './mapa-filtrado.component.html',
  styleUrls: ['./mapa-filtrado.component.css']
})
export class MapaFiltradoComponent implements OnInit {
  categorias: string[] = [];
  marcadores: any[] = [];
  marcadoresFiltrados: any[] = [];

  filtroCategoria: string = '';
  filtroBusqueda: string = '';
  filtroAutor: number | null = null;
  fechaInicio: string = '';
  fechaFin: string = '';

  constructor(private alarmasService: AlarmasService) { }

  ngOnInit(): void {
    this.obtenerCategorias();
    this.cargarAlarmasConUbicacion();
  }

  obtenerCategorias(): void {
    this.alarmasService.getCategorias().subscribe({
      next: (cats) => {
        console.log('Categorias:', cats); // <- este log te dirá si son strings o no
        this.categorias = cats.map((c: any) => c.categoria);
      },
      error: (err) => {
        console.error('Error al obtener categorías:', err);
      }
    });

  }

  cargarAlarmasConUbicacion(): void {
    this.alarmasService.getAlarmasConUbicacion().subscribe({
      next: (data) => {
        this.marcadores = data;
        this.filtrarMarcadores();
      },
      error: (err) => {
        console.error('Error al cargar alarmas con ubicación:', err);
      }
    });
  }

  aplicarFiltros(): void {
    this.filtrarMarcadores();
  }
  filtrarMarcadores(): void {
    this.marcadoresFiltrados = this.marcadores.filter((m) => {
      const coincideCategoria = !this.filtroCategoria || m.categoria?.toLowerCase() === this.filtroCategoria.toLowerCase();
      const coincideBusqueda = !this.filtroBusqueda || (m.descripcion || '').toLowerCase().includes(this.filtroBusqueda.toLowerCase());
      const coincideAutor = !this.filtroAutor || Number(m.autor) === Number(this.filtroAutor);

      const fecha = m.fecha ? new Date(m.fecha) : null;
      const desde = this.fechaInicio ? new Date(this.fechaInicio) : null;
      const hasta = this.fechaFin ? new Date(this.fechaFin) : null;

      const coincideFecha =
        (!desde || (fecha && fecha >= desde)) &&
        (!hasta || (fecha && fecha <= hasta));

      return coincideCategoria && coincideBusqueda && coincideAutor && coincideFecha;
    });

    console.log('🔍 Resultado de filtro:', this.marcadoresFiltrados);
  }
}
