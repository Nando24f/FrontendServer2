import { Component, OnInit } from '@angular/core';
import { AlarmasService } from '../services/Alarmas.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MapaComponent } from '../mapa/mapa.component';

@Component({
  selector: 'app-mapa-filtrado',
  imports: [CommonModule,FormsModule,MapaComponent],
  templateUrl: './mapa-filtrado.component.html',
  styleUrls: ['./mapa-filtrado.component.css']
})
export class MapaFiltradoComponent implements OnInit {
  alarmas: any[] = [];
  alarmasFiltradas: any[] = [];
  marcadoresFiltrados: any[] = [];

  filtroCategoria = '';
  filtroBusqueda = '';
  filtroAutor = '';
  usuarioInput: number | null = null;
  fechaInicio: string = '';
  fechaFin: string = '';

  categorias: string[] = [];

  constructor(private alarmaService: AlarmasService) {}

  ngOnInit(): void {
    this.alarmaService.getAlarmasConUbicacion().subscribe(data => {
      this.alarmas = data;
      this.aplicarFiltros();
    });

    this.alarmaService.getCategoriasDistintas().subscribe(data => {
      this.categorias = data;
    });
  }

  aplicarFiltros(): void {
    this.alarmasFiltradas = this.alarmas.filter(a =>
      (!this.filtroCategoria || a.categoria?.toLowerCase() === this.filtroCategoria.toLowerCase()) &&
      (!this.filtroBusqueda || a.titulo?.toLowerCase().includes(this.filtroBusqueda.toLowerCase())) &&
      (!this.filtroAutor || a.nombre_usuario?.toLowerCase().includes(this.filtroAutor.toLowerCase())) &&
      (!this.fechaInicio || new Date(a.fecha) >= new Date(this.fechaInicio)) &&
      (!this.fechaFin || new Date(a.fecha) <= new Date(this.fechaFin))
    );

    this.marcadoresFiltrados = this.alarmasFiltradas.map(a => ({
      lat: a.latitud,
      lng: a.longitud,
      titulo: a.titulo,
      categoria: a.categoria
    }));
  }

  buscarPorUsuario(): void {
    if (this.usuarioInput) {
      this.alarmaService.getAlarmasPorUsuario(this.usuarioInput).subscribe(data => {
        this.alarmas = data;
        this.aplicarFiltros();
      });
    }
  }

  buscarPorRango(): void {
    if (this.fechaInicio && this.fechaFin) {
      this.alarmaService.getAlarmasPorRango(this.fechaInicio, this.fechaFin).subscribe(data => {
        this.alarmas = data;
        this.aplicarFiltros();
      });
    }
  }

  cargarCriticas(): void {
    this.alarmaService.getCriticasNoResueltas().subscribe(data => {
      this.alarmas = data;
      this.aplicarFiltros();
    });
  }

  cargarResueltas(): void {
    this.alarmaService.getResueltasUltimos7Dias().subscribe(data => {
      this.alarmas = data;
      this.aplicarFiltros();
    });
  }
}
