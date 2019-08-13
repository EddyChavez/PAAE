import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {InterfaceEncuestaCompleta} from '../_models/EncuestasModel';
import {Observable} from 'rxjs';
import {ResponderEncuestaService} from '../responder-encuesta/responder-encuesta.service';

import {Helpers} from './helpers';

@Component({
    selector: 'app-responder-encuesta',
    templateUrl: './responder-encuesta.component.html',
    styleUrls: ['./responder-encuesta.component.scss']
})
export class ResponderEncuestaComponent implements OnInit {

    private pk_aplicacion_encuesta: number;
    private hay_encuesta = null;
    private encuesta_completa: InterfaceEncuestaCompleta;
    private pregunta_inicial: number;
    private cantidad_preguntas: number;

    constructor(private responder_encuestas_service: ResponderEncuestaService,
                private route: ActivatedRoute,
                private http: HttpClient,
                private router: Router,
                private helpers: Helpers) {
        this.pk_aplicacion_encuesta = parseInt(this.route.snapshot.queryParamMap.get('pk_aplicacion_encuesta'));
    }

    ngOnInit() {
        this.responder_encuestas_service.get_encuesta_completa(this.pk_aplicacion_encuesta).subscribe(
            data => this.handleResponse(data),
            error => this.handleError(error)
        );
    }

    handleResponse(data) {
        if (data.data) {
            this.encuesta_completa = data.data;
            this.pregunta_inicial = this.encuesta_completa.SECCIONES[0].PREGUNTAS[0].PK_PREGUNTA;
            this.cantidad_preguntas = this.encuesta_completa.SECCIONES[0].PREGUNTAS.length;
            // console.log(this.encuesta_completa);
        } else {
            this.hay_encuesta = false;
        }
    }

    handleError(error) {
    }

    onSubmit() {
        if (this.encuesta_completa.PK_ENCUESTA === 1) {
            this.encuesta_pasatiempos(); // OK
        } else {
            this.procesa_encuesta();
        }
    }

    public handleResponseGuardar(data) {
        if (data.data) {
            this.router.navigateByUrl('/tutorias/encuestas');
        }
    }

    public actualiza_rango(id_escala: string, id_etiqueta: string, index_pregunta: number, index_respuesta: number) {
        (<HTMLInputElement>document.getElementById(id_etiqueta)).innerHTML =
            (<HTMLInputElement>document.getElementById(id_escala)).value;

        this.encuesta_completa.SECCIONES[0].PREGUNTAS[index_pregunta].RESPUESTAS[index_respuesta].SELECCIONADA =
            parseInt((<HTMLInputElement>document.getElementById(id_escala)).value);

        this.encuesta_completa.SECCIONES[0].PREGUNTAS[index_pregunta].RESPUESTAS[index_respuesta].RANGO =
            parseInt((<HTMLInputElement>document.getElementById(id_escala)).value);

        // console.log(this.encuesta_completa.SECCIONES[0].PREGUNTAS[index_pregunta].RESPUESTAS[index_respuesta].RANGO);
    }

    public procesa_respuesta(index_pregunta: number, index_respuesta: number) {
        for (let _i = 0; _i < this.encuesta_completa.SECCIONES[0].PREGUNTAS[index_pregunta].RESPUESTAS.length; _i++) {
            this.encuesta_completa.SECCIONES[0].PREGUNTAS[index_pregunta].RESPUESTAS[_i].SELECCIONADA = 0;
        }

        this.encuesta_completa.SECCIONES[0].PREGUNTAS[index_pregunta].RESPUESTAS[index_respuesta].SELECCIONADA = 1;
    }

    /* INICIO PROCESAMIENTO DE ENCUESTA */
    public procesa_encuesta() {
        if (this.valida_encuesta()) {
            this.responder_encuestas_service.guarda_respuestas(
                this.get_body_encuesta()
            ).subscribe(
                data => this.handleResponseGuardar(data),
                error => this.handleError(error)
            );
        } else {
            alert('Debe responder a todas las preguntas');
        }
    }

    private get_body_encuesta() {
        return [];
    }

    private valida_encuesta() {
        for (let pregunta of this.encuesta_completa.SECCIONES[0].PREGUNTAS) {
            let pregunta_valid = false;
            for (let respuesta of pregunta.RESPUESTAS) {
                if (pregunta.FK_TIPO_PREGUNTA === 1 || pregunta.FK_TIPO_PREGUNTA === 2) {
                    if (respuesta.SELECCIONADA === 1) {
                        pregunta_valid = true;
                        break;
                    }
                }

                if (pregunta.FK_TIPO_PREGUNTA === 3) {
                    if (respuesta.SELECCIONADA === 1) {
                        if (respuesta.ES_MIXTA === 1) {
                            let contenido_mixta =
                                (<HTMLInputElement>document.getElementById('res_mixta_' + respuesta.PK_RESPUESTA_POSIBLE))
                                    .value
                                    .trim()
                                    .length;
                            if (contenido_mixta > 0) {
                                pregunta_valid = true;
                                break;
                            }
                        }

                    }
                }

                if (pregunta.FK_TIPO_PREGUNTA === 6) {
                    let contenido_abierta =
                        (<HTMLInputElement>document.getElementById('res_abierta_' + respuesta.PK_RESPUESTA_POSIBLE))
                            .value
                            .trim()
                            .length;
                    if (contenido_abierta > 0) {
                        pregunta_valid = true;
                        break;
                    }
                }
            }

            if (pregunta_valid === false) {
                return false;
            }
        }

        return true;
    }

    /* FIN PROCESAMIENTO DE ENCUESTA */

    /* INICIO PROCESAMIENTO DE ENCUESTA DE PASATIEMPOS */
    public encuesta_pasatiempos() {
        var array_respuestas = [], array_original = [];
        for (let _i = 0; _i < 15; _i++) {
            array_respuestas.push(
                parseInt((<HTMLInputElement>document.getElementById('res_' + _i)).value)
            );
            array_original.push({
                pk_respuesta: (<HTMLInputElement>document.getElementById('pk_res_' + _i)).value,
                orden: (<HTMLInputElement>document.getElementById('res_' + _i)).value
            });
        }

        array_respuestas.sort(this.helpers.mayor_a_menor);

        if (this.helpers.valida_array_respuestas_pasatiempos(array_respuestas)) {
            this.responder_encuestas_service.guarda_respuestas_pasatiempos(
                this.pk_aplicacion_encuesta,
                this.encuesta_completa.PK_ENCUESTA,
                array_original
            ).subscribe(
                data => this.handleResponseGuardar(data),
                error => this.handleError(error)
            );
        } else {
            alert('Los números no deben repetirse');
        }
    }

    /* FIN PROCESAMIENTO DE ENCUESTA DE PASATIEMPOS */

}
