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

  constructor( public UusuarioService: UsuarioService ) {

    this.usuario = this.UusuarioService.usuario;

  }

  ngOnInit(): void {
  }

  guardar( usuario: Usuario ){

    console.log( usuario );

    this.usuario.nombre = usuario.nombre;
    this.usuario.email = usuario.email;

    this.UusuarioService.actualizarUsuario( this.usuario )
                        .subscribe( response => {
                        console.log( response );
                        });


  }
}
