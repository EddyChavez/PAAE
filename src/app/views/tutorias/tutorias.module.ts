import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

// Dropdowns Component
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

// Buttons Routing
import { TutoriasRoutingModule } from './tutorias-routing.module';

// Component
import {CollapseModule, TooltipModule} from 'ngx-bootstrap';
import { UsuariosTutoriasComponent } from './usuarios_tutorias/usuarios_tutorias.component';
import { EncuestasComponent } from './encuestas/encuestas.component';
import { VerEncuestasComponent } from './ver-encuestas/ver-encuestas.component';
import { ResponderEncuestaComponent } from './responder-encuesta/responder-encuesta.component';
import { GruposComponent } from './grupos/grupos.component';
import { DetalleGrupoComponent } from './detalle-grupo/detalle-grupo.component';
import { DatosAlumnoComponent } from './datos-alumno/datos-alumno.component';
import { CitasAlumnoComponent } from './citas-alumno/citas-alumno.component';
import { CanalizacionesAlumnoComponent } from './canalizaciones-alumno/canalizaciones-alumno.component';
import { EncuestasAlumnoComponent } from './encuestas-alumno/encuestas-alumno.component';

// Angular

@NgModule({
    imports: [
        CommonModule,
        TutoriasRoutingModule,
        BsDropdownModule.forRoot(),
        FormsModule,
        CollapseModule,
        TooltipModule.forRoot()
    ],
    declarations: [
        UsuariosTutoriasComponent,
        EncuestasComponent,
        VerEncuestasComponent,
        ResponderEncuestaComponent,
        GruposComponent,
        DetalleGrupoComponent,
        DatosAlumnoComponent,
        CitasAlumnoComponent,
        CanalizacionesAlumnoComponent,
        EncuestasAlumnoComponent
    ]
})
export class TutoriasModule { }
