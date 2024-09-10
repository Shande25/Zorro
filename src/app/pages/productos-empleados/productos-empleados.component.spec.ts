import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosEmpleadosComponent } from './productos-empleados.component';

describe('ProductosEmpleadosComponent', () => {
  let component: ProductosEmpleadosComponent;
  let fixture: ComponentFixture<ProductosEmpleadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductosEmpleadosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductosEmpleadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
