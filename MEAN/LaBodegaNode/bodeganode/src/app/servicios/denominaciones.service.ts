import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DenominacionesService {
  
  uri = 'http://localhost:4000/denominaciones';
  constructor(private http: HttpClient) {}
  
  addDenominacionYBodega(nombre_denominacion, ubicacion_denominacion,
    web_denominacion, nombre_bodega, ubicacion_bodega,
    telefono_bodega, web_bodega,email_bodega, blanca, tinta, rosado) {
    const obj = {
      nombre_denominacion: nombre_denominacion,
      ubicacion_denominacion:ubicacion_denominacion,
      web_denominacion: web_denominacion,
      bodegas:{
        nombre_bodega: nombre_bodega,
        ubicacion_bodega: ubicacion_bodega,
        telefono_bodega : Number(telefono_bodega),
        web_bodega : web_bodega,
        email_bodega: email_bodega,
      
        uva:{
        blanca : (/true/i).test(blanca),
        tinta: (/true/i).test(tinta),
        rosado : (/true/i).test(rosado)
    }
  }
    
    };

  console.log(JSON.stringify(obj));
  return this
        .http
        .post(`${this.uri}/add`,obj)
        ;//.subscribe(res=>console.log('Bodega añadida'));
  }

  // Para traer todas las denominaciones
  getDenominaciones(){
    //console.log("Me han llamado");
    return this
            .http
            .get(`${this.uri}`);
  }
  // Para traer todas las denominaciones sin repetir
  getDenominacionesNoRepeat(){
    console.log("Sin repetir");
    return this
          .http
          .get(`${this.uri}/norepeat`);
  }
  // Para los datos de una bodega en concreto
  getBodega(denominacion,bodega){
    return this
            .http
            .get(`${this.uri}/bodega/${denominacion}/${bodega}`);
  }
  // Para todas las bodegas de una denominacion
  getBodegaInfo(denominacion){
    return this
            .http
            .get(`${this.uri}/denominacion/${denominacion}`);
  }

  // Para eliminar una bodega

  deleteBodega(id)
  {
    console.log("Se va a borrar la bodega: " + id);
    return this
           .http
           .delete(`${this.uri}/delete/bodega/${id}`);
  }

  // Para actualizar una bodega
  
  updateBodega(nombre_bodega, web_bodega, email_bodega, telefono_bodega, ubicacion_bodega)
  {
    console.log("se va actualizar la bodega: " + nombre_bodega );
    const obj = {
      web_bodega : web_bodega,
      email_bodega : email_bodega,
      telefono_bodega : Number(telefono_bodega),
      ubicacion_bodega : ubicacion_bodega
    }
    console.log("Se envia esto.. ");
    console.log(obj);
    return this
            .http
            .post(`${this.uri}/updates/${nombre_bodega}`, obj);
            //.subscribe(res=>console.log('Bodega actualizada'));
  }
  

  
}
