import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { EmployeeComponent } from './employee.component';
import { ChartModule } from 'primeng/chart';
import { of } from 'rxjs';
import { ManagerService } from '../services/manager.service';

describe('EmployeeComponent', () => {
  let component: EmployeeComponent;
  let fixture: ComponentFixture<EmployeeComponent>;
  let mockManagerService: jasmine.SpyObj<ManagerService>;

  beforeEach(async () => {
    mockManagerService = jasmine.createSpyObj('ManagerService', [
      'getCalles', 
      'getVecinos',
      'getVecinosPorCalleTodas',
      'getVecinosPorCalle',
      'getHombresPorCalle',
      'getMujeresPorCalle',
      'getAdministradores',
      'getAlarmas',
      'getPorcentajeHombresAlarmas',
      'getPorcentajeMujeresAlarmas',
      'getCantidadHombres',
      'getCantidadMujeres'
    ]);
    
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule, ChartModule],
      declarations: [EmployeeComponent],
      providers: [
        { provide: ManagerService, useValue: mockManagerService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeComponent);
    component = fixture.componentInstance;
    
    // Configurar respuestas mock
    mockManagerService.getCalles.and.returnValue(of(['Calle 1', 'Calle 2']));
    mockManagerService.getVecinos.and.returnValue(of([]));
    mockManagerService.getVecinosPorCalleTodas.and.returnValue(of([
      { calle: 'Avenida Primavera', cantidad: 45 },
      { calle: 'Calle 1', cantidad: 32 }
    ]));
    mockManagerService.getVecinosPorCalle.and.returnValue(of([{ cantidad_vecinos: 10 }]));
    mockManagerService.getHombresPorCalle.and.returnValue(of([{ cantidad_hombres: 5 }]));
    mockManagerService.getMujeresPorCalle.and.returnValue(of([{ cantidad_mujeres: 5 }]));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load initial data', () => {
    expect(mockManagerService.getCalles).toHaveBeenCalled();
    expect(mockManagerService.getVecinosPorCalleTodas).toHaveBeenCalled();
  });

  it('should search by street', () => {
    component.selectedCalle = 'Calle 1';
    component.onSearch();
    expect(mockManagerService.getVecinosPorCalle).toHaveBeenCalledWith('Calle 1');
    expect(mockManagerService.getHombresPorCalle).toHaveBeenCalledWith('Calle 1');
    expect(mockManagerService.getMujeresPorCalle).toHaveBeenCalledWith('Calle 1');
  });
});