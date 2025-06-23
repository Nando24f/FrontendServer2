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
      this.categorias = cats.map(c => c.categoria); // extrae solo el string
    });
  }

  cargarAlarmasIniciales(): void {
    this.alarmasService.getAlarmas().subscribe(alarmas => {
      this.marcadoresFiltrados = alarmas;
    });
  }

  aplicarFiltros(): void {
    const filtros = {
  categoria: this.filtroCategoria || undefined,
  texto: this.filtroBusqueda || undefined,
  fechaInicio: this.fechaInicio || undefined,
  fechaFin: this.fechaFin || undefined,
  autor: this.filtroAutor ? parseInt(this.filtroAutor, 10) : undefined
};


    this.alarmasService.getAlarmasFiltradas(filtros).subscribe((datos: any[]) => {
      this.marcadoresFiltrados = datos;
    });
  }
}
