import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from '../../services/service.index';

import Swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde: number = 0;
  cargando: boolean = true;

  totalRegistros: number = 0;

  constructor( public UusuarioService: UsuarioService,
               public MmodalUploadService: ModalUploadService
    ) { }

  ngOnInit(): void {
    this.cargarUsuario();

    this.MmodalUploadService.notificacion.subscribe( res => {
          this.cargarUsuario();
    });

  }

  mostrarModal( id: string ){
    // console.log(id);
    this.MmodalUploadService.mostrarModal( 'usuarios', id );
  }


  cargarUsuario(){

    this.cargando = true;

    this.UusuarioService.cargarUsuarios(this.desde)
                      .subscribe( (response: any) => {
                      // console.log(response);
                      this.totalRegistros = response.total_Usuarios;
                      this.usuarios = response.usuarios;
                      this.cargando = false;
                      });

  }

  cambiarDesde( valor: number){

    const desde = this.desde + valor;

    // console.log(desde);

    if ( desde >= this.totalRegistros ){
      return;
    }
    if ( desde < 0){
      return;
    }

    this.desde += valor;
    this.cargarUsuario();

  }

  buscarUsuario(termino: string){

    // console.log(termino);

    if (termino.length <= 0 ){
      this.cargarUsuario();
      return;
    }

    this.cargando = true;

    this.UusuarioService.buscarUsuarios( termino )
                        .subscribe( (usuarios: Usuario[]) => {

                          // console.log( usuarios);
                          this.usuarios = usuarios;
                          this.cargando = false;
                        });
  }

  borrarUsuario( usuario: Usuario ){
    // console.log(usuario);
    if (usuario._id === this.UusuarioService.usuario._id){

      Swal.fire({ title: 'No puede borrar usuario', text: 'No se puede borrar a sí mismo', icon: 'error' });
      return;

    }

    Swal.fire({
      title: '¿Esta seguro?',
      text: 'Esta a punto de borrar a' + usuario.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borralo!'
    }).then((result) => {

      // console.log(result);

      if (result.value) {

        this.UusuarioService.borrarUsuario( usuario._id )
                            .subscribe( response => {
                              console.log(response);
                              this.cargarUsuario();
                            });

      }
    });


  }

  guardarUsuario( usuario: Usuario ){
    console.log( usuario );
    this.UusuarioService.actualizarUsuario( usuario )
                        .subscribe();
  }

}
