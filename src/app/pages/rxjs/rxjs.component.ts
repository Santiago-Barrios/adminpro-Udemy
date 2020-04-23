import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnInit, OnDestroy {



  subscription: Subscription;

  constructor() {

    this.subscription = this.regresaObservable()
    .subscribe(
      numero => console.log('subs', numero),
      error => console.log('Error en el obs', error),
      () => console.log('El observador termino')
    );

   }

  ngOnInit(): void {
  }

  ngOnDestroy(){
    console.log('La página se va a cerra');
    this.subscription.unsubscribe();
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

      // if ( contador === 3 ) {

      //   clearInterval(intervale);
      //   observer.complete();

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
