import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

declare function initPlugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  recuerdame: boolean = false;
  email: string;

  constructor( public router: Router, public UusuarioService: UsuarioService ) { }

  ngOnInit(): void {
    initPlugins();

    this.email = localStorage.getItem('email') || '';
    if ( this.email.length > 1 ){
      this.recuerdame = true;
    }
  }

  ingresar( forma: NgForm ){

    if (forma.invalid){
      return;
    }

    const usuario = new Usuario( null, forma.value.email, forma.value.password );

    this.UusuarioService.login( usuario, forma.value.recuerdame)
                        .subscribe( response => this.router.navigate(['/dashboard']));

    console.log('ingresando ...');
    console.log(forma.valid);
    console.log(forma.value);
    // this.router.navigate(['/dashboard']);
  }
}
