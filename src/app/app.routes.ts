import { Routes } from '@angular/router';
import { AlarmasComponent } from './alarmas/alarmas.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { ConsultasComponent } from './consultas/consultas.component';

export const routes: Routes = [
  { path: 'alarmas', component: AlarmasComponent },
  { path: 'estadisticas', component: EstadisticasComponent },
  { path: 'consultas', component: ConsultasComponent },
  { path: '', redirectTo: 'alarmas', pathMatch: 'full' }
];
