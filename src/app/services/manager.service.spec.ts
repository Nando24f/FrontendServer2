import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AlarmasService } from './Alarmas.service';

describe('AlarmasService', () => {
  let service: AlarmasService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://200.13.4.251:8080/api';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AlarmasService]
    });
    service = TestBed.inject(AlarmasService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no hay peticiones pendientes
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Métodos del servicio', () => {
    it('getUltimasAlarmasActivas() debería retornar alarmas activas', () => {
      const mockResponse = [
        {
          id: 1,
          nombre: 'Juan',
          apellido: 'Pérez',
          estado: 'pendiente',
          fecha: '2023-05-01',
          hora: '14:30:00'
        }
      ];

      service.getUltimasAlarmasActivas().subscribe(data => {
        expect(data).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${apiUrl}/alarmas/activas`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('getAlarmasConUbicacion() debería retornar alarmas con coordenadas', () => {
      const mockResponse = [
        {
          id: 1,
          categoria: 'Incendio',
          latitud: -33.45694,
          longitud: -70.64827
        }
      ];

      service.getAlarmasConUbicacion().subscribe(data => {
        expect(data).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${apiUrl}/alarmas/mapa`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('getConteoPorEstado() debería retornar estadísticas', () => {
      const mockResponse = [
        { estado: 'pendiente', total: 5 },
        { estado: 'resuelta', total: 3 }
      ];

      service.getConteoPorEstado().subscribe(data => {
        expect(data).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${apiUrl}/alarmas/estados`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('getCriticasNoResueltas() debería retornar alarmas críticas', () => {
      const mockResponse = [
        {
          id: 1,
          prioridad: 'critica',
          estado: 'pendiente'
        }
      ];

      service.getCriticasNoResueltas().subscribe(data => {
        expect(data).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${apiUrl}/alarmas/criticas`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('getAlarmasPorRango() debería enviar parámetros correctos', () => {
      const mockResponse: any[] = [];
      const desde = '2023-01-01';
      const hasta = '2023-01-31';

      service.getAlarmasPorRango(desde, hasta).subscribe(data => {
        expect(data).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(
        `${apiUrl}/alarmas/rango?desde=${desde}&hasta=${hasta}`
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });

  describe('Manejo de errores', () => {
    it('debería manejar errores HTTP', () => {
      const errorMessage = 'Error 404';

      service.getUltimasAlarmasActivas().subscribe({
        next: () => fail('should have failed'),
        error: (error) => {
          expect(error.status).toEqual(404);
          expect(error.statusText).toEqual('Not Found');
        }
      });

      const req = httpMock.expectOne(`${apiUrl}/alarmas/activas`);
      req.flush(errorMessage, { 
        status: 404, 
        statusText: 'Not Found' 
      });
    });

    it('debería manejar red caída', () => {
      const emsg = 'simulated network error';

      service.getAlarmasConUbicacion().subscribe({
        next: () => fail('should have failed'),
        error: (error) => {
          expect(error.error.message).toEqual(emsg);
        }
      });

      const req = httpMock.expectOne(`${apiUrl}/alarmas/mapa`);
      req.error(new ErrorEvent('network error', {
        message: emsg
      }));
    });
  });
});