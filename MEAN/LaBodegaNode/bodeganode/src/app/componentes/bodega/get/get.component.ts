import { Component, OnInit } from '@angular/core';
import Denominaciones from 'src/app/Denominaciones';
import { DenominacionesService } from 'src/app/servicios/denominaciones.service';

@Component({
  selector: 'app-get',
  templateUrl: './get.component.html',
  styleUrls: ['./get.component.css']
})
export class GetComponent implements OnInit {
  denominaciones: Denominaciones[];
  bodega: Denominaciones[];
  constructor(private  d: DenominacionesService) { }

  ngOnInit() {
    this.d
        .getDenominaciones()
        .subscribe((data: Denominaciones[]) => {
          console.log("recuperando denominaciones");
          this.denominaciones = data;
        });

    /*this.d
        .getBodegaInfo("La Rioja")
        .subscribe((data: Denominaciones[])=>{
          this.bodega = data;
        });*/
    
  }

}
