import { Component, OnInit } from '@angular/core';
import {AnteproyectosSeleccion} from './anteproyectosSeleccion';
import {HttpClient} from '@angular/common/http';
import {GenericServicesService} from '../../../services/generic-services.service';

@Component({
  selector: 'app-banco-seleccion',
  templateUrl: './banco_seleccion.component.html',
  styleUrls: ['./banco_seleccion.component.scss'],
  providers: [AnteproyectosSeleccion]
})
export class Banco_seleccionComponent extends GenericServicesService implements OnInit {

  public anteproyectosLista = [];
  ID_ANTEPROYECTO = this.ID_ANTEPROYECTO;
  usuario = sessionStorage.getItem('IdUsuario');

  constructor(private anteproyectosService: AnteproyectosSeleccion, private http: HttpClient) {super(http); }

  ngOnInit() {
    this.anteproyectosService.getAnteproyectos(this.usuario).subscribe(data => this.anteproyectosLista = data);
  }

  uploadFile(id) {
    console.log(id);
    console.log(this.usuario);
    this.http.put(GenericServicesService.API_ENDPOINT + 'Anteproyecto/' + id, {'Alumno': this.usuario.toString()},
        GenericServicesService.HEADERS).subscribe((response) => {
      console.log(response);
    });
  }

}
