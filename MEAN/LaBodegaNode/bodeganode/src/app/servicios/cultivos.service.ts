import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CultivosService {

  uri = 'http://localhost:4000/cultivos';
  constructor(private http: HttpClient) { }

  getCultivos(){
    return this
            .http
            .get(`${this.uri}`);
  }
}

// Mi servicio para traer el texto de los cultivos