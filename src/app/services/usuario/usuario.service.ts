import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';

import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;
  menu: any = [];

  constructor( public http: HttpClient,
               public router: Router,
               public SsubirArchivoService: SubirArchivoService
               ) {
  // console.log('servicio de usuario listo para ser usado');
  this.cargarStorage();
  }

  renuevaToken(){

    let url = URL_SERVICIOS + '/login/renuevatoken';
    url += '?token=' + this.token;

    return this.http.get( url )
                    .pipe(
                      map( (response: any) => {

                        this.token = response.token;
                        localStorage.setItem( 'token', this.token );
                        console.log('Token renovado');


                        return true;

                      }),
                      catchError( err => {

                        this.router.navigate(['/login']);
                        Swal.fire('No se pudo renovar token', 'no fue posible renovar token', 'error' );
                        // console.log(err.error.mensaje);
                        return throwError( err );

                      })

                    );

  }

  estaLogueado(){
    return ( this.token.length > 5 ) ? true : false;
  }

  cargarStorage(){

    if (localStorage.getItem ('token')){
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.menu = JSON.parse(localStorage.getItem('menu'));

    } else {
      this.token = '';
      this.usuario = null;
      this.menu = [];
    }

  }

  guardarStorage( id: string, token: string, usuario: Usuario, menu: any, ){


    localStorage.setItem( 'id', id );
    localStorage.setItem( 'token', token );
    localStorage.setItem( 'usuario', JSON.stringify(usuario) );
    localStorage.setItem( 'menu', JSON.stringify(menu) );

    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
  }

  logout() {
    this.usuario = null;
    this.token = '';
    this.menu = [];

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');

    this.router.navigate(['/login']);
  }

  loginGoogle(token: string){

    const url = URL_SERVICIOS + '/login/google';
    return this.http.post( url, { token } )
                    .pipe(
                      map( (response: any) => {
                        this.guardarStorage( response.id, response.token, response.usuario, response.menu );
                        // console.log(response);
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
                      this.guardarStorage( response.id, response.token, response.usuario, response.menu );

                      return true;
                     }),
                     catchError( err => {
                      Swal.fire('Error en el login', err.error.mensaje, 'error' );
                      // console.log(err.error.mensaje);
                      return throwError( err );

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
                    }),
                    catchError( err => {
                      Swal.fire(err.error.mensaje, err.error.errors.message, 'error' );
                      // console.log(err.error.mensaje);
                      return throwError( err );

                      })
                   );
  }

  actualizarUsuario( usuario: Usuario ){

    let url = URL_SERVICIOS + '/usuario/' +  usuario._id;

    url += '?token=' + this.token;

    // console.log (url);

    return this.http.put(url, usuario)
                    .pipe(
                      map( (response: any) => {

                        if (usuario._id === this.usuario._id){
                          const usuarioDB: Usuario = response.usuario;
                          this.guardarStorage(usuarioDB._id, this.token, usuarioDB, this.menu);
                        }

                        Swal.fire({ title: 'Usuario actualizado', text: usuario.nombre, icon: 'success' });

                        return true;
                      }),
                      catchError( err => {
                        Swal.fire(err.error.mensaje, err.error.errors.message, 'error' );
                        // console.log(err.error.mensaje);
                        return throwError( err );

                        })
                    );

  }

  cambiarImagen( archivo: File, id: string  ){

    this.SsubirArchivoService.subirArchivo( archivo, 'usuarios', id )
        .then ( (response: any) => {
          console.log(response);
          this.usuario.img = response.usuario.img;
          Swal.fire({ title: 'Imagen Actualizada', text: this.usuario.nombre, icon: 'success' });

          this.guardarStorage(id, this.token, this.usuario, this.menu);
        })
        .catch( response => {
        console.log( response);
        });


  }

  cargarUsuarios(desde: number = 0){

    const url = URL_SERVICIOS + '/usuario?desde=' + desde;
    return this.http.get( url );

  }

  buscarUsuarios(termino: string, ){

    const url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;
    return this.http.get( url )
                    .pipe(
                      map( (response: any) =>  response.usuarios)
                    );

  }

  borrarUsuario( id: string ){

    let url = URL_SERVICIOS + '/usuario/' + id;
    url += '?token=' + this.token;

    return this.http.delete( url )
                    .pipe(
                      map( response => {
                        if (response){
                        Swal.fire(
                          'Borrado!',
                          'El usuario ha sido eliminado correctamente',
                          'success'
                        );
                        }
                        return true;
                      })
                    );



  }

}
