import { Component } from '@angular/core';
import { AlarmasService } from '../services/Alarmas.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  imports: [CommonModule,FormsModule],
  standalone: true,
  styleUrls: ['./consultas.component.css']
})
export class ConsultasComponent {
  idUsuario: number = 0;
  resultados: any[] = [];
  mensajeError = '';

  constructor(private alarmasService: AlarmasService) {}

  buscarPorUsuario() {
    this.resultados = [];
    this.mensajeError = '';

    if (!this.idUsuario || this.idUsuario <= 0) {
      this.mensajeError = 'Por favor, ingrese un ID válido.';
      return;
    }

    this.alarmasService.getAlarmasPorUsuario(this.idUsuario).subscribe({
      next: (data) => {
        if (data.length === 0) {
          this.mensajeError = 'No se encontraron alarmas para este usuario.';
        } else {
          this.resultados = data;
        }
      },
      error: (err) => {
        console.error('Error en la consulta:', err);
        this.mensajeError = 'Hubo un error al realizar la consulta.';
      }
    });
  }
}
