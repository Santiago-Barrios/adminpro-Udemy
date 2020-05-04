import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';

import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor( public http: HttpClient ) {
  console.log('servicio de usuario listo para ser usado');
  }

  login( usuario: Usuario, recuerdame: boolean = false ){

    if ( recuerdame ){
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    const url = URL_SERVICIOS + '/login';
    return this.http.post(url, usuario )
                    .pipe(
                     map( (response: any) => {

                      localStorage.setItem( 'id', response.id );
                      localStorage.setItem( 'token', response.token );
                      localStorage.setItem( 'usuario', JSON.stringify(response.usuario) );

                      return true;
                     })
                    );

  }

  crearUsuario( usuario: Usuario ){

   const url = URL_SERVICIOS + '/usuario';

   return this.http.post( url, usuario )
                   .pipe(
                    map( (response: any) => {
                      Swal.fire({ title: 'Usuario creado', text: usuario.email, icon: 'success' });
                      return response.usuario;
                    })
                   );
  }
}
