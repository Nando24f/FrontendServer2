import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaFiltradoComponent } from './mapa-filtrado.component';

describe('MapaFiltradoComponent', () => {
  let component: MapaFiltradoComponent;
  let fixture: ComponentFixture<MapaFiltradoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapaFiltradoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapaFiltradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
