import {NgModule, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {BarraCierreComponent} from './barra-cierre/barra-cierre.component';
import {Router} from '@angular/router';



@NgModule({
  declarations: [BarraCierreComponent],
  imports: [
    CommonModule
  ],
  exports: [BarraCierreComponent]
})
export class ComponentsModule {

}
