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

  usuario: Usuario;
  token: string;

  constructor( public http: HttpClient ) {
  console.log('servicio de usuario listo para ser usado');
  this.cargarStorage();
  }

  estaLogueado(){
    return ( this.token.length > 5 ) ? true : false;
  }

  cargarStorage(){

    if (localStorage.getItem ('token')){
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }

  }

  guardarStorage( id: string, token: string, usuario: Usuario,  ){


    localStorage.setItem( 'id', id );
    localStorage.setItem( 'token', token );
    localStorage.setItem( 'usuario', JSON.stringify(usuario) );

    this.usuario = usuario;
    this.token = token;
  }

  loginGoogle(token: string){

    const url = URL_SERVICIOS + '/login/google';
    return this.http.post( url, { token } )
                    .pipe(
                      map( (response: any) => {
                        this.guardarStorage( response.id, response.token, response.usuario );
                        return true;
                      })
                    );
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

                      // localStorage.setItem( 'id', response.id );
                      // localStorage.setItem( 'token', response.token );
                      // localStorage.setItem( 'usuario', JSON.stringify(response.usuario) );
                      this.guardarStorage( response.id, response.token, response.usuario );

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
