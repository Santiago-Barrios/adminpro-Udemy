import { Component, OnInit, Inject } from '@angular/core';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {

  constructor( public  Aajustes: SettingsService) { }

  ngOnInit(): void {
    this.colocarCheck();
  }

  cambiarColor(tema: string, link: any){

    this.aplicarCheck( link );

    this.Aajustes.aplicarTema( tema );
  }

  // no trabja pero para tener en cuenta
  aplicarCheck( link: any ){

    const selectores: any = document.getElementsByClassName('selector');

    for (const ref of selectores){
      ref.classList.remove('working');
    }

    link.classList.add('working');
  }

  colocarCheck(){

    const selectores: any = document.getElementsByClassName('selector');
    const tema = this.Aajustes.ajustes.tema;

    for (const ref of selectores){
      if ( ref.getAttribute('data-theme') === tema ){
        ref.classList.add('working');
        break;
      }
    }
  }
}
