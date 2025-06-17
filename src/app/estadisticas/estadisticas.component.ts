import { Component, OnInit } from '@angular/core';
import { AlarmasService } from '../services/Alarmas.service';
import { CommonModule } from '@angular/common';
import { Chart } from 'chart.js';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  imports: [CommonModule,ChartModule],
  standalone: true,
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {
  categorias: any[] = [];
  estados: any[] = [];
  usuarios: any[] = [];

  constructor(private alarmasService: AlarmasService) {}

  ngOnInit(): void {
    this.alarmasService.getConteoPorCategoria().subscribe(data => this.categorias = data);
    this.alarmasService.getConteoPorEstado().subscribe(data => this.estados = data);
    this.alarmasService.getTotalAlarmasPorUsuario().subscribe(data => this.usuarios = data);
  }
}