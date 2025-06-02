// employee.component.spec.ts
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
      'getVecinosPorCalle'  // Changed from getVecinosPorCalleTodas to getVecinosPorCalle
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
    
    // Configura respuestas mock
    mockManagerService.getCalles.and.returnValue(of(['Calle 1', 'Calle 2']));
    mockManagerService.getVecinos.and.returnValue(of([
      { id: 1, nombre: 'Juan', calle: 'Calle 1', sexo: 'Masculino' },
      { id: 2, nombre: 'Maria', calle: 'Calle 1', sexo: 'Femenino' }
    ]));
    mockManagerService.getVecinosPorCalle.and.returnValue(of([  // Changed from getVecinosPorCalleTodas to getVecinosPorCalle
      { calle: 'Avenida Primavera', cantidad: 45 },
      { calle: 'Calle 1', cantidad: 32 }
    ]));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load streets and residents', () => {
    expect(mockManagerService.getCalles).toHaveBeenCalled();
    expect(mockManagerService.getVecinos).toHaveBeenCalled();
    expect(mockManagerService.getVecinosPorCalle).toHaveBeenCalled();  // Changed from getVecinosPorCalleTodas to getVecinosPorCalle
  });
});