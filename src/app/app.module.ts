import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { AppComponent } from './app.component';

// Import containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';

const APP_CONTAINERS = [
  DefaultLayoutComponent
];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { EgresadosComponent } from './views/egresados/egresados.component';
import { SistemsComponent } from './sistems/sistems.component';

// login
// import { NavbarComponent } from './components/navbar/navbar.component';
import { SignupComponent } from './components/signup/signup.component';
// import { ProfileComponent } from './components/profile/profile.component';
import { RequestResetComponent } from './components/password/request-reset/request-reset.component';
import { ResponseResetComponent } from './components/password/response-reset/response-reset.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { JarwisService } from './services/jarwis.service';
import { TokenService } from './services/token.service';
import { AuthService } from './services/auth.service';
import { AfterLoginService } from './services/after-login.service';
import { BeforeLoginService } from './services/before-login.service';
// @ts-ignore
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormularioComponent } from './components/formulario/formulario.component';
import { EstadoCivilService } from './components/formulario/estado-civil.service';
import { DependenciaService } from './components/formulario/dependencia.service';
import { PropagandaTecnologicoService } from './components/formulario/propaganda-tecnologico.service';
import { IncapacidadService } from './components/formulario/incapacidad.service';
import { CarreraService } from './components/formulario/carrera.service';
import { EntidadFederativaService } from './components/formulario/entidad-federativa.service';
import { CiudadService } from './components/formulario/ciudad.service';


@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    FormsModule,
    HttpClientModule,
    SnotifyModule,
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule
    ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    P404Component,
    P500Component,
    LoginComponent,
    SignupComponent,
    RegisterComponent,
    RequestResetComponent,
    ResponseResetComponent,
    EgresadosComponent,
    SistemsComponent,
    FormularioComponent
  ],
  providers: [
    EstadoCivilService,
    DependenciaService,
    PropagandaTecnologicoService,
    IncapacidadService,
    CarreraService,
    EntidadFederativaService,
    CiudadService,
    
    {
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  }, JarwisService, TokenService, AuthService, AfterLoginService, BeforeLoginService,
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
SnotifyService],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
