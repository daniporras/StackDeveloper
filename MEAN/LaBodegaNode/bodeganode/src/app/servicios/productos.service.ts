import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  
  
  uri = 'http://localhost:4000/productos';

  constructor(private http: HttpClient) { }

  getProductos()
  {
    console.log("Devuevlo todos los productos");
    return this
          .http
          .get(`${this.uri}`);

  }
}
