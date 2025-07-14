import { Routes } from '@angular/router';
import { AlarmasComponent } from './alarmas/alarmas.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { ConsultasComponent } from './consultas/consultas.component';
import { MapaFiltradoComponent } from './mapa-filtrado/mapa-filtrado.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { PanelAdminComponent } from './panel-admin/panel-admin.component';


export const routes: Routes = [
  { path: 'alarmas', component: AlarmasComponent },
  { path: 'estadisticas', component: EstadisticasComponent },
  { path: 'consultas', component: ConsultasComponent },
  { path: '', redirectTo: 'alarmas', pathMatch: 'full' },
  { path: 'mapa-avanzado', component: MapaFiltradoComponent },
  { path: '', redirectTo: 'mapa-avanzado', pathMatch: 'full' },
  { path: '', component: LoginAdminComponent },
  { path: 'admin', component: PanelAdminComponent }
];

