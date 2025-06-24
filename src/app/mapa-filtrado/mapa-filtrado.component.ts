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
  filtroCategoria: string = '';
  filtroBusqueda: string = '';
  fechaInicio: string = '';
  fechaFin: string = '';
  filtroAutor: number | null = null;

  categorias: string[] = [];
  marcadoresFiltrados: any[] = [];

  constructor(private alarmasService: AlarmasService) {}

  ngOnInit(): void {
    this.cargarCategorias();
    this.cargarAlarmasConUbicacion(); // Carga inicial del mapa
  }

  cargarCategorias(): void {
    this.alarmasService.getCategorias().subscribe((cats: string[]) => {
      this.categorias = cats;
    });
  }

  cargarAlarmasConUbicacion(): void {
    this.alarmasService.getAlarmasConUbicacion().subscribe((alarmas: any[]) => {
      this.marcadoresFiltrados = alarmas;
    });
  }

  aplicarFiltros(): void {
    this.alarmasService.getAlarmasConUbicacion().subscribe((alarmas: any[]) => {
      let filtradas = [...alarmas];

      if (this.filtroBusqueda) {
        const texto = this.filtroBusqueda.toLowerCase();
        filtradas = filtradas.filter(a =>
          a.descripcion?.toLowerCase().includes(texto) || a.categoria?.toLowerCase().includes(texto)
        );
      }

      if (this.filtroCategoria) {
        filtradas = filtradas.filter(a => a.categoria === this.filtroCategoria);
      }

      if (this.filtroAutor != null) {
        filtradas = filtradas.filter(a => a.usuario_id === this.filtroAutor);
      }

      if (this.fechaInicio && this.fechaFin) {
        const inicio = new Date(this.fechaInicio);
        const fin = new Date(this.fechaFin);
        filtradas = filtradas.filter(a => {
          const fecha = new Date(a.fecha);
          return fecha >= inicio && fecha <= fin;
        });
      }

      this.marcadoresFiltrados = filtradas;
    });
  }
}
