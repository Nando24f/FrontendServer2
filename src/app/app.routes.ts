import { Routes } from '@angular/router';
import { AlarmasComponent } from './alarmas/alarmas.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { ConsultasComponent } from './consultas/consultas.component';
import { MapaFiltradoComponent } from './mapa-filtrado/mapa-filtrado.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { PanelAdminComponent } from './panel-admin/panel-admin.component';
import { AuthGuard } from './guards/auth.guard';


export const routes: Routes = [
  { path: '', redirectTo: 'mapa-avanzado', pathMatch: 'full' },
  { path: 'login', component: LoginAdminComponent },
  { path: 'admin', component: PanelAdminComponent, canActivate: [AuthGuard] },
  { path: 'mapa-avanzado', component: MapaFiltradoComponent }
];