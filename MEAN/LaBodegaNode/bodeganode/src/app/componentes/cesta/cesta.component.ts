import { Component, OnInit } from '@angular/core';
import Ventas from 'src/app/Ventas';
import { VentasService } from 'src/app/servicios/ventas.service';

@Component({
  selector: 'app-cesta',
  templateUrl: './cesta.component.html',
  styleUrls: ['./cesta.component.css']
})
export class CestaComponent implements OnInit {

  ventas: Ventas[];

  constructor(private v: VentasService) { }

  ngOnInit() {
    this.v
        .getVentas()
        .subscribe((data : Ventas[])=>{
          this.ventas = data;
        });

    /*this.v
        .deleteVentas()
        .subscribe((data : Ventas[])=>{
          this.ventas = data;
        });*/
  }
  handleClick(){
    console.log('Click!', event);
    
    console.log('Vaciar cesta!!!');
    location.reload();
    this.v.deleteVentas().subscribe();
  }

} 
