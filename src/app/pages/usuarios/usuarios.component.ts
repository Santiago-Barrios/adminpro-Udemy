import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from '../../services/service.index';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde: number = 0;

  totalRegistros: number = 0;

  constructor( public UusuarioService: UsuarioService ) { }

  ngOnInit(): void {
    this.cargarUsuario();
  }


  cargarUsuario(){

  this.UusuarioService.cargarUsuarios(this.desde)
                      .subscribe( (response: any) => {
                      console.log(response);
                      this.totalRegistros = response.total_Usuarios;
                      this.usuarios = response.usuarios;
                      });

  }

  cambiarDesde( valor: number){

    const desde = this.desde + valor;

    console.log(desde);

    if ( desde >= this.totalRegistros ){
      return;
    }
    if ( desde < 0){
      return;
    }

    this.desde += valor;
    this.cargarUsuario();

  }

}
