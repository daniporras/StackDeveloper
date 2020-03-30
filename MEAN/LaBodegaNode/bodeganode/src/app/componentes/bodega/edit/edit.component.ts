import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DenominacionesService } from 'src/app/servicios/denominaciones.service';
import Denominaciones from 'src/app/Denominaciones';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  bodega: String;
  denominaciones: Denominaciones[];
  denominacion: String;
  angForm: FormGroup;
  private sub: any;
  constructor(private route: ActivatedRoute, private d: DenominacionesService, private fb: FormBuilder, private router: Router) {
    this.crearFormulario();
   }

 
  
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      
      this.bodega = params['bodega'];
      this.denominacion = params ['denominacion'];
      console.log("Denominacion: " + this.denominacion + "Bodega:  " + this.bodega);
      });
      
  }

  buscarBodega(denominacion, bodega)
  {
           this
            .d
            .getBodega(denominacion,bodega)
            .subscribe((data: Denominaciones[])=>{
              this.denominaciones = data;
            });

  }

  crearFormulario()
  {
    this.angForm = this.fb.group({
      web_bodega: ['', Validators.required],
      email_bodega: ['', Validators.required],
      telefono_bodega: ['', Validators.required],
      ubicacion_bodega: ['', Validators.required]
    });
  }

  onSubmit() {
    console.log("viene aqui");
    console.log(this.angForm.value);
    this
    .d
    .updateBodega(
      this.bodega,
      this.angForm.get('web_bodega').value,
      this.angForm.get('email_bodega').value,
      this.angForm.get('telefono_bodega').value,
      this.angForm.get('ubicacion_bodega').value
    ).subscribe(data =>{
      this.router.navigate(['/bodegas']);
    });
  }
  
}
