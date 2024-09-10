import { Component } from '@angular/core';
import { ProductosService } from '../../services/users/productos/productos.service';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { Productos } from '../../services/users/productos/productos.service';
import {NzTableModule} from 'ng-zorro-antd/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [
    NzTableModule,
    CommonModule
  ],
  templateUrl: './productos-empleados.component.html',
  styleUrl: './productos-empleados.component.css'
})
export class ProductosEmpleadosComponent {
   productos: Productos[] = [];
 

  constructor(private productosService: ProductosService) {}

 ngOnInit(): void {
   this.getProductos();
 }
 getProductos(): void {
   this.productosService.getProducts().subscribe((response) => {
     this.productos = response
      })
    }
  }