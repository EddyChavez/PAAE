import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class GenericServicesService {

    // AMBIENTE DE PRODUCCIÓN
    // protected static API_ENDPOINT = 'http://10.0.6.120/backend_swiitl/server.php/api/';

    // AMBIENTE DE PRUEBAS
    //protected static API_ENDPOINT = 'http://10.0.31.10/backend_swiitl/server.php/api/';
    //protected static ENDPOINT = 'http://10.0.31.10/backend_swiitl/server.php/';

    // AMBIENTE LOCAL
    protected static API_ENDPOINT = 'http://127.0.0.1:8000/api/';
    protected static ENDPOINT = 'http://127.0.0.1:8000/';

    protected static HEADERS = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('token')
        })
    };

    protected httpClient: HttpClient;

    constructor(httpClient: HttpClient) {
        this.httpClient = httpClient;
    }

    protected get(ruta: string) {
        return this.httpClient.get(
            GenericServicesService.API_ENDPOINT + ruta,
            GenericServicesService.HEADERS
        );
    }

    post(ruta: string, body: object) {
        return this.httpClient.post(
            GenericServicesService.API_ENDPOINT + ruta,
            body,
            GenericServicesService.HEADERS).subscribe(
                (response) => {
                    // response;
                }
            );
    }

    protected put(ruta: string, body: object) {
        return this.httpClient.put(
            GenericServicesService.API_ENDPOINT + ruta,
            body,
            GenericServicesService.HEADERS
        );
    }

    protected delete(ruta: string) {
        return this.httpClient.delete(
            GenericServicesService.API_ENDPOINT + ruta,
            GenericServicesService.HEADERS
        );
    }


    /* Ejemplo_Enviar_Archivo(evt: any) {
        var archivo: File = evt.target.files[0];
        if (!archivo) {
            return;
        };
        var myReader: FileReader = new FileReader();
        myReader.onloadend = (e) => {
            this.aspiranteService.addPagos({ "Sistema": this.sistema, "Nombre": archivo.name.split('.').shift(), "Extencion": archivo.name.split('.').pop(), "Archivo": myReader.result }, this.periodo);
        }
        myReader.readAsDataURL(archivo);
    } */
}
