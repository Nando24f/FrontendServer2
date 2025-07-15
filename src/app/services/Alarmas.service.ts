import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlarmasService {
  private apiUrl = '/api/alarmas';

  constructor(private http: HttpClient) { }

  // 1. Listar todas las alarmas
  getAlarmas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/listar`);
  }

  // 2. Buscar alarma por ID
  getAlarmaPorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // 3. Buscar por texto libre
  buscarAlarmasPorTexto(texto: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/buscar?texto=${texto}`);
  }

  // 4. Obtener categorías únicas
  getCategorias(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/categorias`);
  }

  // 5. Alarmas por categoría
  getAlarmasPorCategoria(categoria: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/categoria?valor=${categoria}`);
  }

  // 6. Alarmas por usuario
  getAlarmasPorUsuario(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/usuario?id=${id}`);
  }

  // 7. Alarmas por rango de fechas
  getAlarmasPorRango(fechaInicio: string, fechaFin: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/rango?inicio=${fechaInicio}&fin=${fechaFin}`);
  }

  // 8. Alarmas críticas
  getAlarmasCriticas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/criticas`);
  }

  // 9. Alarmas resueltas
  getAlarmasResueltas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/resueltas`);
  }

  // 10. Conteo por categoría
  getConteoPorCategoria(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/conteo/categoria`);
  }

  // 11. Conteo por estado
  getConteoPorEstado(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/conteo/estado`);
  }

  // 12. Conteo por usuario
  getTotalAlarmasPorUsuario(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/conteo/usuario`);
  }

  // 13. Resueltas en los últimos 7 días
  getResueltasUltimos7Dias(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/resueltas7dias`);
  }

  // 14. Alarmas con coordenadas para el mapa
  getAlarmasConUbicacion(): Observable<any> {
    return this.http.get(`${this.apiUrl}/mapa`);
  }


  // 15. Filtros combinados (categoría, texto, fechas, autor)
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

  getLogin(rut: string, clave: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/login/verificar`, {
      params: { rut, clave }
    });
  }

  crearUsuarioLogin(rut: string, clave: string, categoria: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/login/crear`, {
      params: { rut, clave, categoria },    responseType: 'text' as 'json' // 👈 También aquí
    });
  }

  crearUsuarioDatos(
    nombre: string,
    rut: string,
    direccion: string,
    email: string,
    telefono: string,
    contactoNombre: string,
    contactoDireccion: string,
    contactoEmail: string,
    contactoTelefono: string
  ): Observable<any> {
    return this.http.get(`${this.apiUrl}/usuario/datos/crear`, {
      params: {
        nombre,
        rut,
        direccion,
        email,
        telefono,
        contactoNombre,
        contactoDireccion,
        contactoEmail,
        contactoTelefono
      },    responseType: 'text' as 'json' // 👈 También aquí
    });
  }
  verificarLoginAdmin(rut: string, clave: string): Observable<any> {
  return this.http.get(`/api/alarmas/login/verificar/admin`, {
    params: { rut, clave }
  });
}

getDatosUsuarioPorRut(rut: string): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/datos/por-rut`, {
    params: { rut }
  });
}
// 16. Obtener la última alarma registrada (Query 21)
getUltimaAlarma(): Observable<any> {
  return this.http.get<any>('/api/query21');
}
// 17. Obtener alarmas creadas en los últimos 5 minutos
getAlarmasRecientes(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/recientes`);
}
// 18. Enviar (crear) una nueva alarma
enviarAlarma(data: {
  usuario_id: number;
  nombre_usuario: string;
  direccion_usuario: string;
  categoria: string;
  descripcion_evento: string;
  prioridad: string;
  estado: string;
  latitud: number;
  longitud: number;
}): Observable<any> {
  return this.http.get(`${this.apiUrl}/crear`, {
    params: {
      usuario_id: data.usuario_id,
      nombre_usuario: data.nombre_usuario,
      direccion_usuario: data.direccion_usuario,
      categoria: data.categoria,
      descripcion_evento: data.descripcion_evento,
      prioridad: data.prioridad,
      estado: data.estado,
      latitud: data.latitud.toString(),
      longitud: data.longitud.toString()
    },
    responseType: 'text' as 'json'
  });
}

}
