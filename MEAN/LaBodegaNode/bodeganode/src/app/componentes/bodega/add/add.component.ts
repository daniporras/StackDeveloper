import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DenominacionesService } from 'src/app/servicios/denominaciones.service';
import Denominaciones from 'src/app/Denominaciones';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  denominaciones: Denominaciones[];
  angForm: FormGroup;
  

  constructor(private fb: FormBuilder, private d: DenominacionesService, private router: Router){
    this.crearFormulario();
  }
 
  crearFormulario()
  {
    this.angForm = this.fb.group({
      // Valido
      nombre_denominacion: ['', Validators.required],
      ubicacion_denominacion: ['', Validators.required],
      web_denominacion: ['',Validators.required],
      nombre_bodega: ['',Validators.required],
      web_bodega: ['', Validators.required],
      email_bodega: ['', Validators.required],
      telefono_bodega: ['', Validators.required],
      ubicacion_bodega: ['', Validators.required],
      rosada: ['',Validators.required],
      tinta: ['', Validators.required],
      blanca:['', Validators.required]
    });
  }


  addDenominacion(nombre_denominacion: string, ubicacion_denominacion: string, web_denominacion: string, nombre_bodega: string, ubicacion_bodega: string,
    telefono_bodega: string, web_bodega: string, email_bodega: string, blanca: boolean, tinta: boolean, rosado: boolean)
    {

      console.log(" Se va  Insertar..");
      console.log(nombre_denominacion, ubicacion_denominacion,web_denominacion,nombre_bodega,ubicacion_bodega,
        telefono_bodega, web_bodega,email_bodega, blanca, tinta, rosado);
     
    }
  
  onSubmit()
  {
    
   
    this
    .d
    .addDenominacionYBodega(
      this.angForm.get('nombre_denominacion').value,
      this.angForm.get('ubicacion_denominacion').value,
      this.angForm.get('web_denominacion').value,
      this.angForm.get('nombre_bodega').value,
      this.angForm.get('ubicacion_bodega').value,
      this.angForm.get('telefono_bodega').value,
      this.angForm.get('web_bodega').value,
      this.angForm.get('email_bodega').value,
      this.angForm.get('blanca').value,
      this.angForm.get('tinta').value,
      this.angForm.get('rosada').value
    ).subscribe(data =>{
      this.router.navigate(['/bodegas']);
    });
  }

  ngOnInit() {
    
  }
}
