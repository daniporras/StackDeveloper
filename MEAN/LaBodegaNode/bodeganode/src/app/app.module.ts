import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { TiendaComponent } from './componentes/tienda/tienda.component';
import { AddComponent } from './componentes/bodega/add/add.component';
import { GetComponent } from './componentes/bodega/get/get.component';
import { EditComponent } from './componentes/bodega/edit/edit.component';
import { VinedoComponent } from './componentes/vinedo/vinedo.component';
import { ContactoComponent } from './componentes/contacto/contacto.component';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DenominacionesService } from './servicios/denominaciones.service';
import { GetidComponent } from './componentes/bodega/getid/getid.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule} from '@angular/material/input'; 
import { MatButtonModule} from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list'
import { CestaComponent } from './componentes/cesta/cesta.component';
import { PerfilComponent } from './componentes/perfil/perfil.component'
import { MatDialogModule } from '@angular/material/dialog'; 

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    TiendaComponent,
    AddComponent,
    GetComponent,
    EditComponent,
    VinedoComponent,
    ContactoComponent,
    GetidComponent,
    CestaComponent,
    PerfilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SlimLoadingBarModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ DenominacionesService, Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
