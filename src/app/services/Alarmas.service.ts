import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlarmasService {
  private apiUrl = 'http://200.13.4.221:9090/alarmas';

  constructor(private http: HttpClient) {}

  // 1. Obtener todas las alarmas
  getAlarmas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/listar`);
  }

  // 2. Buscar por ID
  getAlarmaPorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // 3. Buscar por categoría
  getAlarmasPorCategoria(categoria: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/categoria?valor=${categoria}`);
  }

  // 4. Buscar por usuario
  getAlarmasPorUsuario(idUsuario: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/usuario?id=${idUsuario}`);
  }

  // 5. Buscar por rango de fechas
  getAlarmasPorRango(fechaInicio: string, fechaFin: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/rango?inicio=${fechaInicio}&fin=${fechaFin}`);
  }

  // 6. Buscar críticas
  getAlarmasCriticas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/criticas`);
  }

  // 7. Buscar resueltas
  getAlarmasResueltas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/resueltas`);
  }

  // 8. Categorías
  getCategorias(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/categorias`);
  }

  // 9. Buscar por texto
  buscarAlarmasPorTexto(texto: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/buscar?texto=${texto}`);
  }

  // 10. Filtros combinados
  getAlarmasFiltradas(params: {
    categoria?: string;
    texto?: string;
    fechaInicio?: string;
    fechaFin?: string;
    autor?: number;
  }): Observable<any[]> {
    const query = new URLSearchParams();
    if (params.categoria) query.append('categoria', params.categoria);
    if (params.texto) query.append('texto', params.texto);
    if (params.fechaInicio) query.append('fechaInicio', params.fechaInicio);
    if (params.fechaFin) query.append('fechaFin', params.fechaFin);
    if (params.autor != null) query.append('autor', params.autor.toString());

    return this.http.get<any[]>(`${this.apiUrl}/filtradas?${query.toString()}`);
  }

  // 11. Últimas activas
  getUltimasAlarmasActivas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/ultimas`);
  }

  // 12. Con ubicación (para el mapa)
  getAlarmasConUbicacion(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/conubicacion`);
  }

  // 13. Críticas no resueltas
  getCriticasNoResueltas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/criticasnoresueltas`);
  }

  // 14. Resueltas en los últimos 7 días
  getResueltasUltimos7Dias(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/resueltas7dias`);
  }

  // 15. Conteo por categoría
  getConteoPorCategoria(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/conteo/categoria`);
  }

  // 16. Conteo por estado
  getConteoPorEstado(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/conteo/estado`);
  }

  // 17. Total de alarmas por usuario
  getTotalAlarmasPorUsuario(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/conteo/usuario`);
  }
}
