import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlarmasService } from '../services/Alarmas.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-estadisticas',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {
  estCat: any[] = [];
  estEstado: any[] = [];
  estUsuarios: any[] = [];

  usuarioId: number = 0;
fechaInicio: string = '';
fechaFin: string = '';

alarmasPorUsuario: any[] = [];
alarmasPorRango: any[] = [];
alarmasCriticas: any[] = [];
alarmasResueltas: any[] = [];

paginaUsuario = 1;
paginaRango = 1;
paginaCriticas = 1;
paginaResueltas = 1;
tamanio = 5;


  constructor(private alarmasService: AlarmasService) {}

  ngOnInit(): void {
    this.alarmasService.getConteoPorCategoria().subscribe(data => this.estCat = data);
    this.alarmasService.getConteoPorEstado().subscribe(data => this.estEstado = data);
    this.alarmasService.getTotalAlarmasPorUsuario().subscribe(data => this.estUsuarios = data);
  }

  paginar(arr: any[], pagina: number) {
    const inicio = (pagina - 1) * this.tamanio;
    return arr.slice(inicio, inicio + this.tamanio);
  }
}
