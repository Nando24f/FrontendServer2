import { Component, OnInit } from '@angular/core';
import { AlarmasService } from '../services/Alarmas.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alarmas',
  templateUrl: './alarmas.component.html',
  imports: [CommonModule],
  standalone: true,
  styleUrls: ['./alarmas.component.css']
})
export class AlarmasComponent implements OnInit {
  alarmas: any[] = [];

  constructor(private alarmasService: AlarmasService) {}

  ngOnInit(): void {
    this.alarmasService.getUltimasAlarmasActivas().subscribe({
      next: (data) => this.alarmas = data,
      error: (err) => console.error('Error cargando alarmas activas:', err)
    });
  }
}
