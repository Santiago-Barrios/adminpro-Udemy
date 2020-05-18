import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  totalHospitales: number = 0;

  constructor( public http: HttpClient) { }

  cargarHospitales(){

    const url = URL_SERVICIOS + '/hospital';

    return this.http.get( url )
                    .pipe(
                      map( (response: any) => {
                        this.totalHospitales = response.total_Hospitales;
                        return response.hospitales;
                      })
                    );

  }
}
