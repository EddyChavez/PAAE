import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';



// Dropdowns Component
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

// Buttons Routing
import { AsesoriaRoutingModule } from './asesoria-routing.module';

// Component
import { Form_alumnoComponent } from './form_alumno/form_alumno.component';
import { Form_asesorComponent } from './form_asesor/form_asesor.component';
import { AperturaComponent } from './apertura/apertura.component';
import { GeneralidadesComponent } from './generalidades/generalidades.component';
import { SolicitudesComponent } from './solicitudes/solicitudes.component';


// Angular

@NgModule({
  imports: [
    CommonModule,
    AsesoriaRoutingModule,
    BsDropdownModule.forRoot(),
    FormsModule,
    NgxPaginationModule,
  ],
  declarations: [
/*     FormularioComponent,
    AdministradorComponent,
    AltasComponent,
    DashboardComponent,
    MatriculaComponent,
    ReimpresiónComponent,
    ReferenciaComponent,
    MatriculadosComponent,
    VigenciaDePagosComponent,
    GruposComponent,
    PagoSinFormalizarComponent,
    SinPagoRegistradoComponent,*/
    Form_asesorComponent,
    Form_alumnoComponent,
    AperturaComponent, 
    GeneralidadesComponent,
    SolicitudesComponent
  ]
})
export class AsesoriaModule {}
