import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Productos {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  url: string = 'http://localhost:8080/api/productos';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Productos[]> {
    return this.http.get<Productos[]>(this.url);
  }

  createProductos(productos: Productos): Observable<Productos> {  // Corregí el nombre de este método
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<Productos>(this.url, productos, {
      headers: httpHeaders
    });
  }

  updateProductos(productos: Productos): Observable<Productos> {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.put<Productos>(`${this.url}/${productos.id}`, productos, {  // Corregí el uso de template literals
      headers: httpHeaders
    });
  }

  deleteProductos(id: string): Observable<Productos> {  // Corregí el nombre de este método
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.delete<Productos>(`${this.url}/${id}`, {  // Corregí el uso de template literals
      headers: httpHeaders
    });
  }
}
