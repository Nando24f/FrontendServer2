import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ManagerService {
  private apiUrl = 'http://200.13.4.251:4200/api'; // Asegúrate de que esta URL sea correcta

  constructor(private http: HttpClient) {}

  // Obtener lista de vecinos (equivalente a managers en el nuevo backend)
  getVecinos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/vecinos`);
  }

  // Obtener lista de administradores
  getAdministradores(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/administradores`);
  }

  // Obtener alarmas
  getAlarmas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/alarmas`);
  }

  // Obtener porcentaje de hombres con alarmas
  getPorcentajeHombresAlarmas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/alarmas/hombres/porcentaje`);
  }

  // Obtener cantidad de hombres registrados
  getCantidadHombres(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/usuarios/hombres/cantidad`);
  }

  // Obtener calles disponibles
  getCalles(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/calles`);
  }

  // Obtener vecinos por calle
  getVecinosPorCalle(calle: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/vecinos/calle?calle=${calle}`);
  }
}