import { Injectable } from '@angular/core';
import { GenericServicesService } from './generic-services.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TokenService extends GenericServicesService {
  constructor(private http: HttpClient,
  private genericServicesService: GenericServicesService ) { super(http); }

  private baseUrl = GenericServicesService.API_ENDPOINT;

  private iss = {

    login : 'http://127.0.0.1:8000/api/login',
    signup : 'http://127.0.0.1:8000/api/signup'
  }

  handle(token) {

    this.set(token);
  }

  set(token) {
    sessionStorage.setItem('token', token);
  }

  get2() {
    return sessionStorage.getItem('token');
  }

  remove() {
    sessionStorage.removeItem('token');
  }


  isValid() {
    const token = this.get2();
    if (token) {
      const payload = this.payload(token);
      if (payload) {
        return Object.values(this.iss).indexOf(payload.iss) > -1 ? true : false;
      }
    }
    return false;
  }

  payload(token) {
    const payload = token.split('.')[1];
    return this.decode(payload);
  }

  decode(payload) {
    return JSON.parse(atob(payload));
  }

  loggedIn() {
    return this.isValid();
  }

}
