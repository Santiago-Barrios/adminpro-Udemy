import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Usuario } from 'src/app/models/usuario.model';
import { SubirArchivoService } from '../../services/subir-archivo/subir-archivo.service';
import { ModalUploadService } from './modal-upload.service';


@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: [
  ]
})
export class ModalUploadComponent implements OnInit {

  // oculto: string = '';

  usuario: Usuario;
  imagenSubir: File;
  imagenTem: string | ArrayBuffer;

  constructor(
    public SsubirArchivoService: SubirArchivoService,
    public MmodalUploadService: ModalUploadService
    ) {
    console.log('modal listo');
   }

  ngOnInit(): void {
  }



  cerrarModal(){
    this.imagenTem = null;
    this.imagenSubir = null;

    this.MmodalUploadService.ocultarModal();
  }

  seleccionImage(archivo: File){

    if (!archivo){
    this.imagenSubir = null;
    return;
    }


    if (archivo.type.indexOf('image') < 0 ){
      Swal.fire({ title: 'Solo imagenes', text: 'El archivo seleccionado no es una imagen', icon: 'error' });
      this.imagenSubir = null;
      return;
    }

    // console.log(archivo);
    this.imagenSubir = archivo;

    const reader = new FileReader();
    const urlImagenTemp = reader.readAsDataURL( archivo );

    reader.onloadend = () => this.imagenTem = reader.result;
    // console.log(reader.result);

  }

  subirImagen(){

    this.SsubirArchivoService.subirArchivo( this.imagenSubir, this.MmodalUploadService.tipo, this.MmodalUploadService.id  )
                              .then( resp => {

                              console.log(resp);
                              this.MmodalUploadService.notificacion.emit( resp );
                              this.cerrarModal();

                              })
                              .catch( err => {
                                console.log('error en la carga...');
                              });
  }


}
