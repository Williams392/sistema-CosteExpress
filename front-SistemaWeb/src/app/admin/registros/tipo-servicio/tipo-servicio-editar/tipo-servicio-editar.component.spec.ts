import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoServicioEditarComponent } from './tipo-servicio-editar.component';

describe('TipoServicioEditarComponent', () => {
  let component: TipoServicioEditarComponent;
  let fixture: ComponentFixture<TipoServicioEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TipoServicioEditarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TipoServicioEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
