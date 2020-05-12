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
  cargando: boolean = true;

  totalRegistros: number = 0;

  constructor( public UusuarioService: UsuarioService ) { }

  ngOnInit(): void {
    this.cargarUsuario();
  }


  cargarUsuario(){

    this.cargando = true;

    this.UusuarioService.cargarUsuarios(this.desde)
                      .subscribe( (response: any) => {
                      console.log(response);
                      this.totalRegistros = response.total_Usuarios;
                      this.usuarios = response.usuarios;
                      this.cargando = false;
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

}
