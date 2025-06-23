import { Component, OnInit } from '@angular/core';
import { AlarmasService } from '../services/Alarmas.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mapa-filtrado',
  imports: [FormsModule],
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

  alarmasPorUsuario: any[] = [];
  alarmasPorRango: any[] = [];
  criticasNoResueltas: any[] = [];
  resueltasUltimos7Dias: any[] = [];

  usuarioInput: number = 0;

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
      const autorOk = !this.filtroAutor || a.nombre_usuario.toLowerCase().includes(this.filtroAutor.toLowerCase());
      const fecha = new Date(a.fecha);
      const desde = this.fechaInicio ? new Date(this.fechaInicio) : null;
      const hasta = this.fechaFin ? new Date(this.fechaFin) : null;
      const fechaOk = (!desde || fecha >= desde) && (!hasta || fecha <= hasta);
      return catOk && busqOk && autorOk && fechaOk;
    });
  }

  buscarPorUsuario() {
    this.alarmasService.getAlarmaPorId(this.usuarioInput).subscribe(data => {
      this.alarmasPorUsuario = [data];
    });
  }

  buscarPorRango() {
    if (!this.fechaInicio || !this.fechaFin) return;
    this.alarmasService.getAlarmasPorRango(this.fechaInicio, this.fechaFin).subscribe(data => {
      this.alarmasPorRango = data;
    });
  }

  cargarCriticas() {
    this.alarmasService.getCriticasNoResueltas().subscribe(data => {
      this.criticasNoResueltas = data;
    });
  }

  cargarResueltas() {
    this.alarmasService.getResueltasUltimos7Dias().subscribe(data => {
      this.resueltasUltimos7Dias = data;
    });
  }
}
