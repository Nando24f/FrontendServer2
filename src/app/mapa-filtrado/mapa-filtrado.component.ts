
import { Component, OnInit } from '@angular/core';
import { AlarmasService } from '../services/Alarmas.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MapaComponent } from '../mapa/mapa.component';

@Component({
  selector: 'app-mapa-filtrado',
  standalone: true,
  imports: [CommonModule, FormsModule, MapaComponent],
  templateUrl: './mapa-filtrado.component.html',
  styleUrls: ['./mapa-filtrado.component.css']
})
export class MapaFiltradoComponent implements OnInit {
  todasLasAlarmas: any[] = [];
  marcadoresFiltrados: any[] = [];
  categorias: string[] = [];

  filtroCategoria = '';
  filtroBusqueda = '';
  filtroAutor = '';
  fechaInicio?: string;
  fechaFin?: string;

  constructor(private alarmasService: AlarmasService) {}

  ngOnInit(): void {
    this.alarmasService.getAlarmasConUbicacion().subscribe(data => {
      this.todasLasAlarmas = data;
      this.marcadoresFiltrados = data;
      this.categorias = Array.from(new Set(data.map((a: any) => a.categoria)));
    });
  }

  aplicarFiltros() {
    this.marcadoresFiltrados = this.todasLasAlarmas.filter(a => {
      const catOk = !this.filtroCategoria || a.categoria === this.filtroCategoria;
      const busqOk = !this.filtroBusqueda || JSON.stringify(a).toLowerCase().includes(this.filtroBusqueda.toLowerCase());
      const autorOk = !this.filtroAutor || (a.nombre_usuario?.toLowerCase().includes(this.filtroAutor.toLowerCase()));

      const fecha = new Date(a.fecha);
      const desde = this.fechaInicio ? new Date(this.fechaInicio) : null;
      const hasta = this.fechaFin ? new Date(this.fechaFin) : null;
      const fechaOk = (!desde || fecha >= desde) && (!hasta || fecha <= hasta);

      return catOk && busqOk && autorOk && fechaOk;
    });
  }
}
