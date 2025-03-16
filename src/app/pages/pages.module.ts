import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PagesComponent} from './pages.component';
import {LibroComponent} from './libro/libro.component';
import {TemaComponent} from './tema/tema.component';
import {AutoresComponent} from './autores/autores.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {ComponentsModule} from '../components/components.module';
import {CardModule} from 'primeng/card';
import { NuevoLibroComponent } from './nuevo-libro/nuevo-libro.component';
import {Button, ButtonDirective} from 'primeng/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';
import {SidebarModule} from "primeng/sidebar";
import {AppModule} from '../app.module';
import {CarritoComponent} from '../carrito/carrito.component';

@NgModule({
  declarations: [
    AutoresComponent,
    LibroComponent,
    TemaComponent,
    CarritoComponent,
    NuevoLibroComponent,
    PagesComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    ComponentsModule,
    CardModule,
    ButtonDirective,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    DropdownModule,
    Button,
    SidebarModule,
  ],

})
export class PagesModule {
}
