import { Component, OnInit } from '@angular/core';
import { AlarmasService } from '../services/Alarmas.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mapa-filtrado',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './mapa-filtrado.component.html',
  styleUrls: ['./mapa-filtrado.component.css']
})
export class MapaFiltradoComponent implements OnInit {
  filtroCategoria: string = '';
  filtroBusqueda: string = '';
  fechaInicio: string = '';
  fechaFin: string = '';
  filtroAutor: number | null = null;

  categorias: any[] = [];
  marcadoresFiltrados: any[] = [];

  constructor(private alarmasService: AlarmasService) {}

  ngOnInit(): void {
    this.cargarCategorias();
    this.cargarTodasLasAlarmas();
  }

  cargarCategorias(): void {
    this.alarmasService.getAlarmasPorCategoria('').subscribe(cats => {
      this.categorias = cats;
    });
  }

  cargarTodasLasAlarmas(): void {
    this.alarmasService.getMapa().subscribe(res => {
      this.marcadoresFiltrados = res;
    });
  }

  aplicarFiltros(): void {
    if (this.filtroBusqueda) {
      this.buscarPorTexto();
    } else if (this.filtroCategoria) {
      this.consultarPorCategoria();
    } else if (this.filtroAutor) {
      this.consultarPorUsuario();
    } else if (this.fechaInicio && this.fechaFin) {
      this.consultarPorRango();
    } else {
      this.cargarTodasLasAlarmas();
    }
  }

  consultarPorCategoria(): void {
    this.alarmasService.getAlarmasPorCategoria(this.filtroCategoria).subscribe(res => {
      this.marcadoresFiltrados = res;
    });
  }

  consultarPorUsuario(): void {
    if (!this.filtroAutor) return;
    this.alarmasService.getAlarmasPorUsuario(this.filtroAutor).subscribe(res => {
      this.marcadoresFiltrados = res;
    });
  }

  consultarPorRango(): void {
    if (!this.fechaInicio || !this.fechaFin) return;
    this.alarmasService.getAlarmasPorRango(this.fechaInicio, this.fechaFin).subscribe(res => {
      this.marcadoresFiltrados = res;
    });
  }

  buscarPorTexto(): void {
    this.alarmasService.buscarAlarmas(this.filtroBusqueda).subscribe(res => {
      this.marcadoresFiltrados = res;
    });
  }
}
