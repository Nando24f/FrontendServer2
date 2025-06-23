import { Component, OnInit } from '@angular/core';
import { AlarmasService } from '../services/Alarmas.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MapaComponent } from '../mapa/mapa.component';

@Component({
  selector: 'app-mapa-filtrado',
  standalone: true,
  imports: [FormsModule, CommonModule, MapaComponent],
  templateUrl: './mapa-filtrado.component.html',
  styleUrls: ['./mapa-filtrado.component.css']
})
export class MapaFiltradoComponent implements OnInit {
  categorias: string[] = [];
  marcadoresFiltrados: any[] = [];

  filtroCategoria: string = '';
  filtroBusqueda: string = '';
  filtroAutor: string = '';
  fechaInicio: string = '';
  fechaFin: string = '';

  constructor(private alarmasService: AlarmasService) {}

  ngOnInit(): void {
    this.cargarCategorias();
    this.cargarAlarmasIniciales();
  }

  cargarCategorias(): void {
    this.alarmasService.getConteoPorCategoria().subscribe(cats => {
      this.categorias = cats.map(c => c.categoria);
    });
  }

  cargarAlarmasIniciales(): void {
    this.alarmasService.getAlarmasConUbicacion().subscribe(alarmas => {
      this.marcadoresFiltrados = alarmas;
    });
  }

  aplicarFiltros(): void {
    // Filtro solo por categoría
    if (this.filtroCategoria && !this.filtroAutor && !this.fechaInicio && !this.fechaFin) {
      this.alarmasService.getAlarmasPorCategoria(this.filtroCategoria).subscribe(res => {
        this.marcadoresFiltrados = this.filtrarPorTexto(res);
      });
      return;
    }

    // Filtro solo por autor
    if (this.filtroAutor && !this.filtroCategoria && !this.fechaInicio && !this.fechaFin) {
      const id = parseInt(this.filtroAutor, 10);
      if (!isNaN(id)) {
        this.alarmasService.getAlarmasPorUsuario(id).subscribe(res => {
          this.marcadoresFiltrados = this.filtrarPorTexto(res);
        });
      }
      return;
    }

    // Filtro solo por rango de fecha
    if (this.fechaInicio && this.fechaFin && !this.filtroCategoria && !this.filtroAutor) {
      this.alarmasService.getAlarmasPorRango(this.fechaInicio, this.fechaFin).subscribe(res => {
        this.marcadoresFiltrados = this.filtrarPorTexto(res);
      });
      return;
    }

    // Filtros combinados: aplicar todos localmente
    this.alarmasService.getAlarmasConUbicacion().subscribe(res => {
      let datos = res;

      if (this.filtroCategoria) {
        datos = datos.filter(d => d.categoria === this.filtroCategoria);
      }

      if (this.filtroAutor) {
        const id = parseInt(this.filtroAutor, 10);
        if (!isNaN(id)) {
          datos = datos.filter(d => d.usuarioId === id);
        }
      }

      if (this.fechaInicio && this.fechaFin) {
        const desde = new Date(this.fechaInicio);
        const hasta = new Date(this.fechaFin);
        datos = datos.filter(d => {
          const fecha = new Date(d.fecha);
          return fecha >= desde && fecha <= hasta;
        });
      }

      this.marcadoresFiltrados = this.filtrarPorTexto(datos);
    });
  }

  filtrarPorTexto(alarmas: any[]): any[] {
    if (!this.filtroBusqueda) return alarmas;
    const texto = this.filtroBusqueda.toLowerCase();
    return alarmas.filter(a =>
      JSON.stringify(a).toLowerCase().includes(texto)
    );
  }
}
