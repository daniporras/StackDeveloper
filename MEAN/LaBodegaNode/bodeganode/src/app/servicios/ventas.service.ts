import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import Ventas from '../Ventas';
import { throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class VentasService {

  uri = 'http://localhost:4000/ventas';
  constructor(private http:HttpClient) { }

// para traer todas las ventas
getVentas()
{
  console.log("Devuelvo todas las ventas");
  return this
          .http
          .get(`${this.uri}`);
}
// Para traer 


// para insertar una venta
postVentas(nombre, descripcion, precio, unidades)
{
  const obj = {
    nombre : nombre,
    descripcion : descripcion,
    precio : precio,
    unidades : unidades
  };
  console.log(obj);
  return this
          .http
          .post(`${this.uri}/add`, obj)
          .subscribe(res => console.log('Done'));
}




// para borrar todas las ventas
deleteVentas()
{
  console.log("Borro todas las ventas");
  return this
          .http
          .get(`${this.uri}/delete`);
}

}



