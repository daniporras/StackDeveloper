import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DenominacionesService } from 'src/app/servicios/denominaciones.service';
import Denominaciones from 'src/app/Denominaciones';

@Component({
  selector: 'app-getid',
  templateUrl: './getid.component.html',
  styleUrls: ['./getid.component.css']
})
export class GetidComponent implements OnInit {
  denominaciones: Denominaciones[];
  denominacion: String;
  bodega: String;
  private sub: any;
  constructor(private route: ActivatedRoute, private d: DenominacionesService, private router:Router) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.denominacion = params['denominacion'];
      this.bodega = params['bodega'];
      console.log(this.denominacion+ "  "+this.bodega);
      
      this.d.getBodega(this.denominacion, this.bodega)
        .subscribe((data: Denominaciones[])=>
        {this.denominaciones = data;
        console.log(this.denominaciones);
      });
           
    });
  }

  // borramos la bodega

  handleClick(nombre: string){
  console.log("El nombre de la bodega a eliminar es: " + nombre);
  return this
         .d.deleteBodega(nombre).subscribe(data =>{
          this.router.navigate(['/bodegas']);
        });
  }

}
