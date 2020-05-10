import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;
  imagenSubir: File;
  imagenTem: string | ArrayBuffer;

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


    if (archivo.type.indexOf('image') < 0 ){
      Swal.fire({ title: 'Solo imagenes', text: 'El archivo seleccionado no es una imagen', icon: 'error' });
      this.imagenSubir = null;
      return;
    }

    // console.log(archivo);
    this.imagenSubir = archivo;

    const reader = new FileReader();
    const urlImagenTemp = reader.readAsDataURL( archivo );

    reader.onloadend = () => this.imagenTem = reader.result;
    // console.log(reader.result);

  }

  cambiarImagen(){

    this.UusuarioService.cambiarImagen( this.imagenSubir, this.usuario._id );

  }

}
