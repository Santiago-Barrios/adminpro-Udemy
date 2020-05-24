import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

declare function initPlugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  recuerdame: boolean = false;
  email: string;

  auth2: any;

  constructor( public router: Router, public UusuarioService: UsuarioService ) { }

  ngOnInit(): void {
    initPlugins();
    this.googleInit();

    this.email = localStorage.getItem('email') || '';
    if ( this.email.length > 1 ){
      this.recuerdame = true;
    }
  }

  googleInit(){


    gapi.load('auth2', () => {

      this.auth2 = gapi.auth2.init({
        client_id: '245507988675-lgla1o6h27o33v8lnj8md3hnj6884hh6.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignin(document.getElementById('btnGoogle'));

    });

  }

  attachSignin( element ){

    this.auth2.attachClickHandler( element, {}, googleUser => {

      // const profile = googleUser.getBasicProfile();
      const token = googleUser.getAuthResponse().id_token;
      // console.log('profile', profile);
      this.UusuarioService.loginGoogle( token )
                          .subscribe( () =>  window.location.href = '#/dashboard');

    } );

  }

  ingresar( forma: NgForm ){

    if (forma.invalid){
      return;
    }

    const usuario = new Usuario( null, forma.value.email, forma.value.password );

    this.UusuarioService.login( usuario, forma.value.recuerdame)
                        .subscribe( response => this.router.navigate(['/dashboard']));

    // console.log('ingresando ...');
    // console.log(forma.valid);
    // console.log(forma.value);
    // this.router.navigate(['/dashboard']);
  }
}
