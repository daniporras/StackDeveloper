import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { TiendaComponent } from './componentes/tienda/tienda.component';
import { GetComponent } from './componentes/bodega/get/get.component';
import { EditComponent } from './componentes/bodega/edit/edit.component';
import { AddComponent } from './componentes/bodega/add/add.component';
import { VinedoComponent } from './componentes/vinedo/vinedo.component';
import { ContactoComponent } from './componentes/contacto/contacto.component';
import { GetidComponent } from './componentes/bodega/getid/getid.component';
import { CestaComponent } from './componentes/cesta/cesta.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';

const routes: Routes = [
{
  path: '',
  redirectTo: 'index',
  pathMatch: 'full'
},
{
  path: 'index',
  component: InicioComponent
},
{
  path: 'tienda',
  component: TiendaComponent
},
{
  path: 'bodegas',
  component: GetComponent
},
{
  path: 'bodega/edit/:denominacion/:bodega',
  component: EditComponent
},
{
  path: 'bodega/:denominacion/:bodega',
  component: GetidComponent
},
{
  path: 'bodega/add',
  component: AddComponent
},
{
  path: 'vinedos',
  component: VinedoComponent
},
{
  path: 'contacto',
  component: ContactoComponent
},
{
  path: 'cesta',
  component: CestaComponent
},
{
  path: 'perfil',
  component: PerfilComponent
}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
