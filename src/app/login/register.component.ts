import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

declare function initPlugins();


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;

  constructor( public UusuarioService: UsuarioService ) { }

  sonIguales( campo1: string, campo2: string){


  return (group: FormGroup) => {

    const pass1 = group.controls[campo1].value;
    const pass2 = group.controls[campo2].value;

    if (pass1 === pass2){

      return null;

    }

    return{
      sonIguales: true
    };

  };

}

  ngOnInit(): void {
    initPlugins();

    this.forma = new FormGroup({


      nombre: new FormControl( null, Validators.required ),
      correo: new FormControl(null, [Validators.required, Validators.email ]),
      password: new FormControl( null, Validators.required ),
      password2: new FormControl( null, Validators.required ),
      condiciones: new FormControl( false ),

    }, { validators: this.sonIguales('password', 'password2') } );

    this.forma.setValue({

      nombre: 'test ',
      correo: 'test1@test.com',
      password: '123456',
      password2: '123456',
      condiciones: true,

    });

  }

registrarUsuario(){

  if ( this.forma.invalid){
    return;
  }

  if ( this.forma.value.condiciones === false){
    Swal.fire('Importante', 'Debes aceptar las condiciones!', 'warning');
   }

  console.log( 'forma válida', this.forma.valid);
  console.log (this.forma.value);

  const usuario = new Usuario(
    this.forma.value.nombre,
    this.forma.value.correo,
    this.forma.value.password,
  );

  this.UusuarioService.crearUsuario( usuario )
                      .subscribe( response => {

                        console.log(response);

                      });

  }
}

