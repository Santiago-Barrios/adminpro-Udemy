import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

  constructor(
    private http: HttpClient
  ) { }

  subirArchivo( archivo: File, tipo: string, id: string ){

    return new Promise ( (resolve, reject) => {

    const formData = new FormData();

    if (archivo){
      formData.append( 'imagen', archivo, archivo.name );
    }
    console.log(id);

    const url = URL_SERVICIOS + '/upload/' + tipo + '/' + id;

    this.http.put(url, formData).subscribe(
      (res) => {
        resolve(res);
      },
      (error) => {
        reject(error);
      }
    );

  });
  }
}
