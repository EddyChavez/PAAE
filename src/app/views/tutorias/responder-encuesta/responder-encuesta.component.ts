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

    constructor(private responder_encuestas_service: ResponderEncuestaService,
                private route: ActivatedRoute,
                private http: HttpClient,
                private router: Router,
                private helpers: Helpers) {
        this.pk_aplicacion_encuesta = parseInt(this.route.snapshot.queryParamMap.get('pk_aplicacion_encuesta'));
    }

    ngOnInit() {
        this.responder_encuestas_service.get_encuesta_completa(this.pk_aplicacion_encuesta.toString()).subscribe(
            data => this.handleResponse(data),
            error => this.handleError(error)
        );
    }

    handleResponse(data) {
        if (data.data) {
            this.encuesta_completa = data.data;
            // console.log(this.encuesta_completa);
        } else {
            this.hay_encuesta = false;
        }
    }

    handleError(error) {
    }

    onSubmit() {
        switch (this.encuesta_completa.PK_ENCUESTA) {
            case 1: // OK
                this.encuesta_pasatiempos();
                break;

            case 2:
                this.encuesta_salud();
                break;

            case 3:
                this.encuesta_condicion_socioeconomica();
                break;

            case 4:
                this.encuesta_condicion_academica();
                break;

            case 5:
                this.encuesta_condicion_familiar();
                break;

            case 6:
                this.encuesta_habitos_estudio();
                break;

            case 7:
                this.encuesta_evaluacion_tutoria_sem_1();
                break;

            case 8:
                this.encuesta_16_factores_personalidad();
                break;

            case 9:
                this.encuesta_causas_reprobacion();
                break;

            case 10:
                this.encuesta_evaluacion_tutoria_sem_2();
                break;
        }
    }

    public handleResponseGuardar(data) {
        if (data.data) {
            this.router.navigateByUrl('/tutorias/encuestas');
        }
    }

    /* INICIO PROCESAMIENTO DE ENCUESTA DE SALUD */
    public encuesta_salud() {

    }

    /* FIN PROCESAMIENTO DE ENCUESTA DE SALUD */

    /* INICIO PROCESAMIENTO DE ENCUESTA CONDICION SOCIOECONOMICA */
    public encuesta_condicion_socioeconomica() {

    }

    /* FIN PROCESAMIENTO DE ENCUESTA CONDICION SOCIOECONOMICA */

    /* INICIO PROCESAMIENTO DE ENCUESTA CONDICION ACADEMICA */
    public encuesta_condicion_academica() {

    }

    /* FIN PROCESAMIENTO DE ENCUESTA CONDICION ACADEMICA */

    /* INICIO PROCESAMIENTO DE ENCUESTA CONDICION FAMILIAR */
    public encuesta_condicion_familiar() {

    }

    /* FIN PROCESAMIENTO DE ENCUESTA CONDICION FAMILIAR */

    /* INICIO PROCESAMIENTO DE ENCUESTA HABITOS DE ESTUDIO */
    public encuesta_habitos_estudio() {

    }

    /* INICIO PROCESAMIENTO DE ENCUESTA HABITOS DE ESTUDIO */

    /* INICIO PROCESAMIENTO DE ENCUESTA TUTORIAS PRIMER SEMESTRE */
    public encuesta_evaluacion_tutoria_sem_1() {

    }

    /* FIN PROCESAMIENTO DE ENCUESTA TUTORIAS PRIMER SEMESTRE */

    /* INICIO PROCESAMIENTO DE ENCUESTA 16 FACTORES DE PERSONALIDAD */
    public encuesta_16_factores_personalidad() {

    }

    /* FIN PROCESAMIENTO DE ENCUESTA 16 FACTORES DE PERSONALIDAD */

    /* INICIO PROCESAMIENTO DE ENCUESTA CAUSAS DE REPROBACION */
    public encuesta_causas_reprobacion() {

    }

    /* FIN PROCESAMIENTO DE ENCUESTA CAUSAS DE REPROBACION */

    /* INICIO PROCESAMIENTO DE ENCUESTA TUTORIAS SEGUNDO SEMESTRE EN ADELANTE */
    public encuesta_evaluacion_tutoria_sem_2() {

    }

    /* INICIO PROCESAMIENTO DE ENCUESTA TUTORIAS SEGUNDO SEMESTRE EN ADELANTE */

    /* INICIO PROCESAMIENTO DE ENCUESTA DE PASATIEMPOS */
    public encuesta_pasatiempos() {
        var array_respuestas = [], array_original = [];
        for (var _i = 0; _i < 15; _i++) {
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
            this.responder_encuestas_service.guarda_respuestas_pasatiempos(this.pk_aplicacion_encuesta.toString(), array_original).subscribe(
                data => this.handleResponseGuardar(data),
                error => this.handleError(error)
            );
        } else {
            alert('Los números no deben repetirse');
        }
    }

    /* FIN PROCESAMIENTO DE ENCUESTA DE PASATIEMPOS */

}
