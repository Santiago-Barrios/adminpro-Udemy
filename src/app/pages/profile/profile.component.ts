import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;
  imagenSubir: File;

  constructor( public UusuarioService: UsuarioService ) {

    this.usuario = this.UusuarioService.usuario;

  }

  ngOnInit(): void {
  }

  guardar( usuario: Usuario ){

    console.log( usuario );

    this.usuario.nombre = usuario.nombre;
    if (!this.usuario.google){
      this.usuario.email = usuario.email;
    }

    this.UusuarioService.actualizarUsuario( this.usuario )
                        .subscribe();


  }

  seleccionImage(archivo: File){

    if (!archivo){
    this.imagenSubir = null;
    return;
    }

    this.imagenSubir = archivo;

    // console.log(archivo);
  }

  cambiarImagen(){

    this.UusuarioService.cambiarImagenn( this.imagenSubir, this.usuario._id );

  }

}
