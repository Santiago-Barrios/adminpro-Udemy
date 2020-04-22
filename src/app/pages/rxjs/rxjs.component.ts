import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnInit {

  constructor() {

    this.regresaObservable().pipe(
      retry(2)
     )
    .subscribe(
      numero => console.log('subs', numero),
      error => console.log('Error en el obs', error),
      () => console.log('El observador termino')
    );

   }

  ngOnInit(): void {
  }

  regresaObservable(): Observable<number>{
  // tslint:disable-next-line: prefer-const
    return new Observable( observer => {
    let contador = 0;
    const intervale = setInterval( () => {
      contador += 1;
      observer.next( contador );
      if ( contador === 3 ) {
        clearInterval(intervale);
        observer.complete();
      }
      if ( contador === 2 ) {
        // clearInterval(intervale);
        observer.error('Auxilio');
      }
    }, 1000);
  });

}

}
