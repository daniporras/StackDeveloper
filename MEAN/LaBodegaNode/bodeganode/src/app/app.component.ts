import { Component } from '@angular/core';
import { Event,
   NavigationStart,
   NavigationCancel,
   NavigationEnd,
   NavigationError,
   Router } from '@angular/router';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { VentasService } from './servicios/ventas.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'La Bodega 3.0';
  constructor(private _loadingBar: SlimLoadingBarService, private _router:Router, private v: VentasService){
    this._router.events.subscribe((event: Event)=>{
      this.navigationInterceptor(event);
    });
    
  }
  
  navbarOpen = false;
  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  navigationInterceptor(event: Event) :void{
    if(event instanceof NavigationStart){
      this._loadingBar.start();
    }
    if(event instanceof NavigationCancel){
      this._loadingBar.stop();
    }
    if(event instanceof NavigationEnd){
      this._loadingBar.complete();
    }
    if(event instanceof NavigationError){
      this._loadingBar.stop();
    }
  
  }
  ngOnInit(){
    console.log("Se inicia..");
    //console.log("Se borrar todos los registros de la tienda");
    /* Borramos las ventas al iniciar */
    //this.v
    //    .deleteVentas();
  }
  
  
}
