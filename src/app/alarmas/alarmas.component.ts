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
  alarmasUbicacion: any[] = [];

  constructor(private alarmasService: AlarmasService) {}

  ngOnInit(): void {
    this.alarmasService.getUltimasAlarmasActivas().subscribe(data => this.alarmas = data);
    this.alarmasService.getAlarmasConUbicacion().subscribe(data => this.alarmasUbicacion = data);
  }
}
