import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
ajustes: Ajustes = {
  temaUrl: 'assets/css/colors/default.css',
  tema: 'default',
};
  constructor(@Inject(DOCUMENT) private Domdocument) {
    this.cargarAjustes();
  }

  guardarAjustes(){
    // console.log('guardado en el localstorage');
    localStorage.setItem('ajustes', JSON.stringify(this.ajustes) );
  }

  cargarAjustes(){

    if ( localStorage.getItem('ajustes') ){
      this.ajustes = JSON.parse ( localStorage.getItem('ajustes'));
      // console.log('cargando del localStorege');

      this.aplicarTema( this.ajustes.tema );
    }else{
      // console.log('cargando valores por defecto');
      this.aplicarTema( this.ajustes.tema );
    }
  }

  aplicarTema( tema: string){

    const url = `assets/css/colors/${tema}.css`;
    this.Domdocument.getElementById('tema').setAttribute('href', url );

    this.ajustes.tema = tema;
    this.ajustes.temaUrl = url;

    this.guardarAjustes();

  }

}

interface Ajustes{
  temaUrl: string;
  tema: string;
}
