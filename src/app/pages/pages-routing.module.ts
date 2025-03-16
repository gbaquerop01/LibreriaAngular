import {NgModule} from '@angular/core';
import {PagesComponent} from './pages.component';
import {AutoresComponent} from './autores/autores.component';
import {LibroComponent} from './libro/libro.component';
import {TemaComponent} from './tema/tema.component';
import { RouterModule, Routes } from '@angular/router';
import {NuevoLibroComponent} from './nuevo-libro/nuevo-libro.component';
import {LoginComponent} from '../auth/login/login.component';
import {RegisterComponent} from '../auth/register/register.component';
import {CarritoComponent} from '../carrito/carrito.component';

const routes: Routes = [
  {
    path: 'main', component: PagesComponent, children: [
      {path: 'libros', component: LibroComponent, data: {title: 'Libros'}},
      {path: 'temas', component: TemaComponent, data: {title: 'Temas'}},
      {path: 'autores', component: AutoresComponent, data: {title: 'Autores'}},
      {path: 'nuevo-libro', component: NuevoLibroComponent, data: {title: 'Nuevo Libro'}},
      {path: 'login', component: LoginComponent, data: {title: 'Login'}},
      {path: 'register', component: RegisterComponent, data: {title: 'Login'}},
      {path: 'carrito', component: CarritoComponent, data: {title: 'Carrito'}},
    ]
  }
];


@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class PagesRoutingModule {
}
