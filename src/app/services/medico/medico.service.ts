import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import Swal from 'sweetalert2';
import { Medico } from '../../models/medico.model';


@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  medico: Medico;
  totalMedicos: number = 0;

  constructor(
    public http: HttpClient,
    public UusuarioService: UsuarioService
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

  borrarMedico( id: string ){

    let url = URL_SERVICIOS + '/medico/' + id;

    url += '?token=' + this.UusuarioService.token;

    return this.http.delete( url )
                    .pipe(
                      map( response => {

                        console.log(response);

                        Swal.fire( {title: 'Médico Borrado',
                        text:  'borrado exitosamente'  , icon: 'success' });

                      })
                    );

  }
}
