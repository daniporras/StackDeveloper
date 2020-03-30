import { Component, OnInit } from '@angular/core';
import Productos from 'src/app/Productos';
import { ProductosService } from 'src/app/servicios/productos.service';
import { VentasService } from 'src/app/servicios/ventas.service';
import Ventas from 'src/app/Ventas';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css']
})
export class TiendaComponent implements OnInit {
  productos: Productos[];
  ventas : Ventas[];
  constructor(private p: ProductosService, private v: VentasService, private dialog: MatDialog) { }

  ngOnInit() {
    // cargo los productos
    this.p
        .getProductos()
        .subscribe((data: Productos[])=>{
          this.productos=data;
        });
    
    
        
  }
  handleClick(nombre: string, descripcion: string, precio: string, unidades: string){
   
    this.v.postVentas(nombre, descripcion, precio, unidades);
        
  }

  

}
