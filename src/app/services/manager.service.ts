import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ManagerService {
  private apiUrl = 'http://200.13.4.251:4200/api';

  constructor(private http: HttpClient) {}

  // 1. Lista de vecinos registrados
  getVecinos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/vecinos`);
  }

  // 2. Lista de administradores
  getAdministradores(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/administradores`);
  }

  // 3. Lista de alarmas
  getAlarmas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/alarmas`);
  }

  // 4. Porcentaje de hombres con alarmas
  getPorcentajeHombresAlarmas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/alarmas/hombres/porcentaje`);
  }

  // 5. Porcentaje de mujeres con alarmas
  getPorcentajeMujeresAlarmas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/alarmas/mujeres/porcentaje`);
  }

  // 6. Cantidad de hombres registrados
  getCantidadHombres(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/usuarios/hombres/cantidad`);
  }

  // 7. Cantidad de mujeres registradas
  getCantidadMujeres(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/usuarios/mujeres/cantidad`);
  }

  // 8. Lista de calles
  getCalles(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/calles`);
  }

  // 9. Vecinos por calle
  getVecinosPorCalle(calle: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/vecinos/calle?calle=${calle}`);
  }

  // 10. Hombres por calle
  getHombresPorCalle(calle: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/usuarios/hombres/calle?calle=${calle}`);
  }

  // 11. Mujeres por calle
  getMujeresPorCalle(calle: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/usuarios/mujeres/calle?calle=${calle}`);
  }
}