import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  constructor() {

    // tslint:disable-next-line: prefer-const
    let promesa = new Promise( (resolve, reject) => {
    // tslint:disable-next-line: prefer-const
    let contador = 0;
    // tslint:disable-next-line: prefer-const
    let intervalo = setInterval(() => {

        contador += 1;
        console.log(contador);

        if ( contador === 3 ){

          resolve('OK!');
          // reject('simplemente una pendejada');
          clearInterval(intervalo);

        }
      }, 1000);

    });


    promesa.then(
      mensaje => console.log('se resolvio', mensaje)
    )
    .catch(
      error => console.error('Error en la promesa', error)
      );
  }

  ngOnInit(): void {
  }

}
