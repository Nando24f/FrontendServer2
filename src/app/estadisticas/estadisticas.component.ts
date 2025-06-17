import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlarmasService } from '../services/Alarmas.service';

@Component({
  selector: 'app-estadisticas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {
  estCat: any[] = [];
  estEstado: any[] = [];
  estUsuarios: any[] = [];

  paginaCat = 1;
  paginaEstado = 1;
  paginaUsuarios = 1;
  tamanio = 5;

  constructor(private alarmasService: AlarmasService) {}

  ngOnInit(): void {
    this.alarmasService.getConteoPorCategoria().subscribe(data => this.estCat = data);
    this.alarmasService.getConteoPorEstado().subscribe(data => this.estEstado = data);
    this.alarmasService.getTotalAlarmasPorUsuario().subscribe(data => this.estUsuarios = data);
  }

  paginar(arr: any[], pagina: number): any[] {
    const inicio = (pagina - 1) * this.tamanio;
    return arr.slice(inicio, inicio + this.tamanio);
  }

  // Métodos para paginación por categoría
  anteriorCat() {
    if (this.paginaCat > 1) this.paginaCat--;
  }

  siguienteCat() {
    if (this.paginaCat * this.tamanio < this.estCat.length) this.paginaCat++;
  }

  // Métodos para paginación por estado
  anteriorEstado() {
    if (this.paginaEstado > 1) this.paginaEstado--;
  }

  siguienteEstado() {
    if (this.paginaEstado * this.tamanio < this.estEstado.length) this.paginaEstado++;
  }

  // Métodos para paginación por usuario
  anteriorUsuarios() {
    if (this.paginaUsuarios > 1) this.paginaUsuarios--;
  }

  siguienteUsuarios() {
    if (this.paginaUsuarios * this.tamanio < this.estUsuarios.length) this.paginaUsuarios++;
  }
}
