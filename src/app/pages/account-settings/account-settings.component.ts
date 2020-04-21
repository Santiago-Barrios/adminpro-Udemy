import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {

  constructor( @Inject(DOCUMENT) private Domdocument ) { }

  ngOnInit(): void {
  }

  cambiarColor(tema: string, link: any){
    console.log(tema);
    console.log(link);

    this.aplicarCheck( link );
    const url = `assets/css/colors/${tema}.css`;
    this.Domdocument.getElementById('tema').setAttribute('href', url );
  }

  aplicarCheck( link: any ){

    const selectores: any = document.getElementsByClassName('selector');

    for (const ref of selectores){
      ref.classList.remove('working');
    }

    link.classList.add('working');
  }

}
