import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BreadCrumbComponent} from './bread-crumb/bread-crumb.component';
import {BarraNavegacionComponent} from './barra-navegacion/barra-navegacion.component';
import {ButtonModule} from 'primeng/button';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {DockModule} from 'primeng/dock';


@NgModule({
  declarations: [
    BreadCrumbComponent,
    BarraNavegacionComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    BreadcrumbModule,
    DockModule
  ],
  exports: [
    BreadCrumbComponent,
    BarraNavegacionComponent
  ]
})
export class SharedModule { }
