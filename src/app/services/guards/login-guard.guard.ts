import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';


@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {

  constructor( public UusuarioService: UsuarioService, public router: Router ){}

  canActivate(){


    if ( this.UusuarioService.estaLogueado()){
      // console.log('paso el guard');
      return true;
    } else {
      console.log('No paso por el guard Bloqueado');
      this.router.navigate(['/login']);
      return false;
    }

  }

}
