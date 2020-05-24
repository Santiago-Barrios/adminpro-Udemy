import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AndminGuard implements CanActivate {

  constructor( 
    public UusuarioService: UsuarioService,
    public router: Router
   ){}

  canActivate() {

   if (this.UusuarioService.usuario.role === 'ADMIN_ROLE'){
    return true;
   } else {
     console.log('bloqueado por el ADMIN GUARD');
     this.UusuarioService.logout();
     return false;
   }


  }

}
