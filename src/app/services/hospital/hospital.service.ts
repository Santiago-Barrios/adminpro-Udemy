import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import Swal from 'sweetalert2';
import { Hospital } from 'src/app/models/hospital.model';


@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  totalHospitales: number = 0;

  constructor( public http: HttpClient,
               public UusuarioService: UsuarioService  ) { }

    cargarHospitalesD(desde: number = 0){

    const url = URL_SERVICIOS + '/hospital?desde=' + desde;
    return this.http.get( url );

  }

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

  obtenerHospital(id: string){

    const url = URL_SERVICIOS + '/hospital/' + id;
    return this.http.get( url )
                    .pipe(
                      map( (response: any) => {
                        return response.hospital;
                      })
                    );

  }

  borrarHospital(id: string){

    let url = URL_SERVICIOS + '/hospital/' + id;
    url += '?token=' + this.UusuarioService.token;

    return this.http.delete( url )
                    .pipe(
                      map( response => Swal.fire({ title: 'Hospital borrado', text: 'Eliminado Correctamente', icon: 'success' }))
                    );
  }

  crearHospital( nombre: string ){

    let url = URL_SERVICIOS + '/hospital';
    url += '?token=' + this.UusuarioService.token;

    return this.http.post( url, {nombre} )
                    .pipe(
                      map( (response: any) => response.hospital)
                    );

  }

  buscarHospital( termino: string ){

    const url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;
    return this.http.get( url )
                    .pipe(
                      map( (response: any) =>  response.hospitales)
                    );

  }

  actualizarHospital( hospital: Hospital ){

    let url = URL_SERVICIOS + '/hospital/' + hospital._id;
    url += '?token=' + this.UusuarioService.token;

    return this.http.put( url, hospital )
                    .pipe(
                      map( (response: any) => {

                        Swal.fire({ title: 'Hospital actualizado', text: hospital.nombre + ' actualizado Correctamente', icon: 'success' });

                        return response.hospital;
                      })
                    );

  }
}
