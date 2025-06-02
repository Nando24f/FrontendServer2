import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ManagerService {
  private apiUrl = 'http://200.13.4.251:4200/api';

  constructor(private http: HttpClient) {}

  getVecinos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/vecinos`);
  }

  getAdministradores(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/administradores`);
  }

  getAlarmas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/alarmas`);
  }

  getPorcentajeHombresAlarmas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/alarmas/hombres/porcentaje`);
  }

  getCantidadHombres(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/usuarios/hombres/cantidad`);
  }

  getCalles(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/calles`);
  }

  getVecinosPorCalle(calle: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/vecinos/calle?calle=${calle}`);
  }

  getEstadisticasPorCalle(calle: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/estadisticas/calle?calle=${calle}`);
  }
}