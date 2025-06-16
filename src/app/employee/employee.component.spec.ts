import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EmployeeComponent } from './employee.component';
import { AlarmasService } from '../services/Alarmas.service';
import { ChartModule } from 'primeng/chart';
import { CommonModule } from '@angular/common';

describe('EmployeeComponent', () => {
  let component: EmployeeComponent;
  let fixture: ComponentFixture<EmployeeComponent>;
  let httpMock: HttpTestingController;
  let alarmasService: AlarmasService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ChartModule, CommonModule],
      declarations: [EmployeeComponent],
      providers: [AlarmasService]
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    alarmasService = TestBed.inject(AlarmasService);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no hay peticiones pendientes
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load active alarms data', () => {
    // Datos mock que coinciden con tu estructura real del backend
    const mockAlarmasActivas = [
      {
        id: 1,
        nombre: 'Juan',
        apellido: 'Pérez',
        categoria: 'Incendio',
        estado: 'pendiente',
        fecha: '2023-05-01',
        hora: '14:30:00'
      }
    ];

    component.ngOnInit();
    
    // Simula la respuesta HTTP
    const req = httpMock.expectOne('http://200.13.4.251:8080/api/alarmas/activas');
    expect(req.request.method).toBe('GET');
    req.flush(mockAlarmasActivas);

    expect(component.ultimasAlarmas.length).toBe(1);
    expect(component.ultimasAlarmas[0].nombre).toBe('Juan');
  });

  it('should handle empty alarm states', () => {
    const mockEstados: any[] = [];

    component.ngOnInit();
    
    const req = httpMock.expectOne('http://200.13.4.251:8080/api/alarmas/estados');
    req.flush(mockEstados);

    expect(component.estadisticas.porEstado).toEqual([]);
    expect(component.chartData).toBeUndefined();
  });

  it('should format chart data correctly', () => {
    const mockEstados = [
      { estado: 'pendiente', total: 5 },
      { estado: 'resuelta', total: 3 }
    ];

    component.ngOnInit();
    
    const req = httpMock.expectOne('http://200.13.4.251:8080/api/alarmas/estados');
    req.flush(mockEstados);

    expect(component.chartData.labels).toEqual(['pendiente', 'resuelta']);
    expect(component.chartData.datasets[0].data).toEqual([5, 3]);
  });

  it('should handle HTTP errors', () => {
    spyOn(console, 'error');
    
    component.ngOnInit();
    
    const req = httpMock.expectOne('http://200.13.4.251:8080/api/alarmas/activas');
    req.error(new ErrorEvent('Network error'));
    
    expect(console.error).toHaveBeenCalled();
    expect(component.ultimasAlarmas).toEqual([]);
  });

  it('should count critical alarms', () => {
    const mockCriticas = [
      { id: 1, prioridad: 'critica', estado: 'pendiente' },
      { id: 2, prioridad: 'critica', estado: 'en_proceso' }
    ];

    component.ngOnInit();
    
    const req = httpMock.expectOne('http://200.13.4.251:8080/api/alarmas/criticas');
    req.flush(mockCriticas);

    expect(component.estadisticas.criticas).toBe(2);
  });
});