import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {PagesComponent} from './pages/pages.component';
import {PagesRoutingModule} from './pages/pages-routing.module';
import {UserinfoComponent} from './userinfo/userinfo.component';


const routes: Routes = [
  {path: '', redirectTo: 'main', pathMatch: 'full'},
  {path: 'main', component: PagesComponent},
  {path: 'user-info', component: UserinfoComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes), PagesRoutingModule
],
  exports: [RouterModule]
})
export class AppRoutingModule { }
