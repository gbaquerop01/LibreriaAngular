import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {RouterModule} from '@angular/router';
import {PagesModule} from './pages/pages.module';
import {SharedModule} from './shared/shared.module';
import {HttpClientModule} from '@angular/common/http';
import {provideAnimations} from '@angular/platform-browser/animations';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ButtonDirective} from 'primeng/button';
import { UserinfoComponent } from './userinfo/userinfo.component';
import { CarritoComponent } from './carrito/carrito.component';
import {ComponentsModule} from "./components/components.module";
import {CardModule} from 'primeng/card';

@NgModule({
    declarations: [
        AppComponent,
        PageNotFoundComponent,
        RegisterComponent,
        LoginComponent,
        UserinfoComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        RouterModule,
        PagesModule,
        SharedModule,
        HttpClientModule,
        ReactiveFormsModule,
        ButtonDirective,
        ComponentsModule,
        CardModule
    ],
    providers: [provideAnimations()],
    exports: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
