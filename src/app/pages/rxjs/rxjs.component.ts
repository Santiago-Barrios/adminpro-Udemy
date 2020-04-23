import { Component, OnInit } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnInit {

  constructor() {

    this.regresaObservable()
    .subscribe(
      numero => console.log('subs', numero),
      error => console.log('Error en el obs', error),
      () => console.log('El observador termino')
    );

   }

  ngOnInit(): void {
  }

  regresaObservable(): Observable<any>{

    return new Observable( (observer: Subscriber<any> ) => {

    let contador = 0;

    const intervale = setInterval( () => {

      contador += 1;

      const salida = {
        valor: contador
      };

      observer.next( salida );

      if ( contador === 3 ) {

        clearInterval(intervale);
        observer.complete();

      }
      // if ( contador === 2 ) {
      //   // clearInterval(intervale);
      //   observer.error('Auxilio');
      // }
    }, 1000);


  }).pipe(
    map(resp => resp.valor),
    filter( (valor, index) => {
      // console.log('filter', valor, index);

      if ( (valor % 2) === 1 ){
        // impar
        return true;
      }else{
        // par
        return false;
      }
    })
  );

}

}
