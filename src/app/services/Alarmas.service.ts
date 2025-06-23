import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlarmasService {
  private apiUrl = '/api';

  constructor(private http: HttpClient) {}

  getUltimasAlarmasActivas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/alarmas/activas`);
  }

  getAlarmasConUbicacion(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/alarmas/mapa`);
  }

  getAlarmasPorUsuario(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/alarmas/usuario/${id}`);
  }

  getAlarmasPorRango(desde: string, hasta: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/alarmas/rango?desde=${desde}&hasta=${hasta}`);
  }

  getConteoPorCategoria(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/alarmas/categorias`);
  }

  getConteoPorEstado(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/alarmas/estados`);
  }

  getTotalAlarmasPorUsuario(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/alarmas/por_usuario`);
  }

  getAlarmaPorId(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/alarmas/${id}`);
  }

  getCriticasNoResueltas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/alarmas/criticas`);
  }

  getResueltasUltimos7Dias(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/alarmas/resueltas`);
  }

  getCategoriasDistintas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/alarmas/categorias_distintas`);
  }

  getUsuariosConAlarmas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/alarmas/usuarios`);
  }

  getAlarmasPorCategoria(categoria: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/alarmas/porcategoria?categoria=${categoria}`);
  }
}
