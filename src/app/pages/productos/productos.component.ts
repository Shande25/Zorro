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
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    ReactiveFormsModule,
    NzCheckboxModule,
    NzIconModule,
    NzTableModule,
    CommonModule
  ],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent {
   productos: Productos[] = [];
  form: FormGroup;

  constructor(private productosService: ProductosService, private fromBuilder: FormBuilder) {
    this.form = this.fromBuilder.group({
      nombre: ['', [Validators.required]],
      descripcion: [0, [Validators.required]],
      precio: [0, [Validators.required]],
    });
  }

 ngOnInit(): void {
   this.getProductos();
 }
 getProductos(): void {
   this.productosService.getProducts().subscribe((response) => {
     this.productos = response
   })
 }
  onClickSubmit(): void {
    if (this.form.valid) return;
      this.productosService.createProductos(this.form.value).subscribe((response) => {
        this.productos.push(response)
      })
   }
   onClickUpdate(id: string): void {
    this.productosService.updateProductos({id, ...this.form.value}).subscribe((response) => {
      const index = this.productos.findIndex((p) => p.id === response.id)
      this.productos.splice(index, 1)
     })
   }
   onClickDelete(id: string): void {
    this.productosService.deleteProductos(id).subscribe(() => {
      const index = this.productos.findIndex((p) => p.id === id);
      if (index !== -1) {
        this.productos.splice(index, 1);
      }
    });
  }  
  }