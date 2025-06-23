import { Component, OnInit } from '@angular/core';
import { AlarmasService } from '../services/Alarmas.service';
import { CommonModule } from '@angular/common';
import { MapaComponent } from '../mapa/mapa.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mapa-filtrado',
  imports: [CommonModule, MapaComponent, FormsModule],
  templateUrl: './mapa-filtrado.component.html',
  styleUrls: ['./mapa-filtrado.component.css']
})
export class MapaFiltradoComponent implements OnInit {
  categorias: string[] = [];
  usuarios: any[] = [];
  marcadoresFiltrados: any[] = [];

  filtroCategoria: string = '';
  filtroBusqueda: string = '';
  filtroAutor: string = '';
  fechaInicio: string = '';
  fechaFin: string = '';

  constructor(private alarmasService: AlarmasService) {}

  ngOnInit(): void {
    this.alarmasService.getCategoriasDistintas().subscribe(cats => this.categorias = cats);
    this.alarmasService.getUsuariosConAlarmas().subscribe(users => this.usuarios = users);
    this.cargarTodasConUbicacion();
  }

  cargarTodasConUbicacion(): void {
    this.alarmasService.getAlarmasConUbicacion().subscribe(alarmas => {
      this.marcadoresFiltrados = alarmas;
    });
  }

  aplicarFiltros(): void {
    // 1. Solo filtro por categoría
    if (this.filtroCategoria && !this.filtroAutor && !this.fechaInicio && !this.fechaFin) {
      this.alarmasService.getAlarmasPorCategoria(this.filtroCategoria).subscribe(res => {
        this.marcadoresFiltrados = this.filtrarPorTexto(res);
      });
      return;
    }

    // 2. Solo filtro por usuario
    if (this.filtroAutor && !this.filtroCategoria && !this.fechaInicio && !this.fechaFin) {
      const id = parseInt(this.filtroAutor, 10);
      if (!isNaN(id)) {
        this.alarmasService.getAlarmasPorUsuario(id).subscribe(res => {
          this.marcadoresFiltrados = this.filtrarPorTexto(res);
        });
      }
      return;
    }

    // 3. Solo fechas
    if (this.fechaInicio && this.fechaFin && !this.filtroCategoria && !this.filtroAutor) {
      this.alarmasService.getAlarmasPorRango(this.fechaInicio, this.fechaFin).subscribe(res => {
        this.marcadoresFiltrados = this.filtrarPorTexto(res);
      });
      return;
    }

    // 4. Filtros combinados no soportados por backend → aplicar uno y filtrar el resto
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
