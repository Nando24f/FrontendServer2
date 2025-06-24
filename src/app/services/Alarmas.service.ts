
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlarmasService {
  private apiUrl = '/api/alarmas';

  constructor(private http: HttpClient) {}

  // Obtener todas las alarmas activas
  getAlarmasActivas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/activas`);
  }

  // Buscar alarma por ID
  getAlarmaPorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/id/${id}`);
  }

  // Buscar por texto
  buscarAlarmas(texto: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/buscar?texto=${texto}`);
  }

  // Obtener categorías
  getCategorias(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/categorias`);
  }

  // Obtener categorías distintas
  getCategoriasDistintas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/categorias_distintas`);
  }

  // Obtener alarmas críticas
  getCriticas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/criticas`);
  }

  // Obtener estados
  getEstados(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/estados`);
  }

  // Obtener alarmas filtradas
  getAlarmasFiltradas(params: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/filtradas`, { params });
  }

  // Obtener mapa de alarmas
  getMapa(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/mapa`);
  }

  // Obtener por categoría
  getAlarmasPorCategoria(categoria: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/por_categoria?categoria=${categoria}`);
  }

  // Obtener por usuario (query param)
  getAlarmasPorUsuario(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/usuario/${id}`);
  }

  // Obtener por rango
  getAlarmasPorRango(fechaInicio: string, fechaFin: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/rango?inicio=${fechaInicio}&fin=${fechaFin}`);
  }

  // Obtener alarmas resueltas
  getAlarmasResueltas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/resueltas`);
  }

  // Obtener usuarios disponibles
  getUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/usuarios`);
  }

  // Ruta de prueba
  testBackend(): Observable<any> {
    return this.http.get<any>(`/api/test`);
  }
}
