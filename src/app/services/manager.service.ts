import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface VecinosPorCalle {
  calle: string;
  cantidad: number;
}

@Injectable({
  providedIn: 'root',
})
export class ManagerService {
  private apiUrl = 'http://200.13.4.251:4200/api';

  constructor(private http: HttpClient) {}

  // Métodos existentes
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

  getPorcentajeMujeresAlarmas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/alarmas/mujeres/porcentaje`);
  }

  getCantidadHombres(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/usuarios/hombres/cantidad`);
  }

  getCantidadMujeres(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/usuarios/mujeres/cantidad`);
  }

  getCalles(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/calles`);
  }

  // Métodos para manejar calles
  getVecinosPorCalle(calle: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/vecinos/calle?calle=${calle}`);
  }

  getHombresPorCalle(calle: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/usuarios/hombres/calle?calle=${calle}`);
  }

  getMujeresPorCalle(calle: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/usuarios/mujeres/calle?calle=${calle}`);
  }

  // Nuevo método para gráfico de todas las calles
  getVecinosPorCalleTodas(): Observable<VecinosPorCalle[]> {
    return this.http.get<VecinosPorCalle[]>(`${this.apiUrl}/vecinos/por-calle-todas`);
  }
}