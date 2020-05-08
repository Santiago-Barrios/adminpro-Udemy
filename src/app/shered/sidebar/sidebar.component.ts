import { Component, OnInit } from '@angular/core';
import { SidebarService, UsuarioService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  usuario: Usuario;

  constructor( public Ssidebar: SidebarService, public UusuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.usuario = this.UusuarioService.usuario;
  }

}
