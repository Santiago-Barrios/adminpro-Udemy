import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  totalMedicos: number = 0;

  constructor(
    public http: HttpClient
  ) { }

  cargarMedicos(){

    const url = URL_SERVICIOS + '/medico';

    return this.http.get( url )
                    .pipe(
                      map( (response: any) => {

                        this.totalMedicos = response.total_Medicos;
                        // console.log(response.medicos);
                        return response.medicos;
                      })
                     );

  }

  buscarMedicos(termino: string, ){

    const url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + termino;
    return this.http.get( url )
                    .pipe(
                      map( (response: any) =>  response.medicos)
                    );

  }
}
