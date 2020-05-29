import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class VerificaTokenGuard implements CanActivate {

  constructor( public UusuarioService: UsuarioService  ) { }

  canActivate(): Promise<boolean> | boolean {

    console.log('Token guard its works');

    const token = this.UusuarioService.token;
    const payload = JSON.parse( atob( token.split('.')[1] ) );

    console.log(payload);

    return true;
  }

}
