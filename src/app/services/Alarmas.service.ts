import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlarmasService {
  private apiUrl = 'http://localhost:9090/alarmas';

  constructor(private http: HttpClient) {}

  // 1. Obtener todas las alarmas
  getAlarmas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/listar`);
  }

  // 2. Obtener alarma por ID (numérico)
  getAlarmaPorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // 3. Obtener alarmas por categoría (string)
  getAlarmasPorCategoria(categoria: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/categoria?valor=${categoria}`);
  }

  // 4. Obtener alarmas por usuario (número)
  getAlarmasPorUsuario(idUsuario: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/usuario?id=${idUsuario}`);
  }

  // 5. Obtener alarmas por rango de fechas
  getAlarmasPorRango(fechaInicio: string, fechaFin: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/rango?inicio=${fechaInicio}&fin=${fechaFin}`);
  }

  // 6. Obtener alarmas críticas
  getAlarmasCriticas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/criticas`);
  }

  // 7. Obtener alarmas resueltas
  getAlarmasResueltas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/resueltas`);
  }

  // 8. Obtener categorías únicas
  getCategorias(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/categorias`);
  }

  // 9. Búsqueda libre (texto general en descripción u otros campos)
  buscarAlarmasPorTexto(texto: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/buscar?texto=${texto}`);
  }

  // 10. Filtros combinados (si usas una búsqueda compleja, ajusta este endpoint en backend)
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
}
