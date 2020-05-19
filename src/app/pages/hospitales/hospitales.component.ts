import { Component, OnInit } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from '../../services/service.index';
import Swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit {

  constructor(
    public HhospitalService: HospitalService,
    public MmodalUploadService: ModalUploadService
   ) { }

   hospitales: Hospital[] = [];
   desde: number = 0;
   totalRegistros: number = 0;
   cargando: boolean = true;


  ngOnInit(): void {
      this.cargarHospitales();
      this.MmodalUploadService.notificacion.subscribe(
                () => this.cargarHospitales()
      );
  }

  cargarHospital(){

    this.cargando = true;

    this.HhospitalService.cargarHospitalesD(this.desde)
                      .subscribe( (response: any) => {
                      // console.log(response);
                      this.totalRegistros = response.total_Hospitales;
                      this.hospitales = response.hospitales;
                      this.cargando = false;
                      });

  }

  cambiarDesde( valor: number){

    const desde = this.desde + valor;

    // console.log(desde);

    if ( desde >= this.totalRegistros ){
      return;
    }
    if ( desde < 0){
      return;
    }

    this.desde += valor;
    this.cargarHospital();

  }

  cargarHospitales(){
    this.HhospitalService.cargarHospitales()
                         .subscribe( hospitales => {
                           this.totalRegistros = hospitales.total_Hospitales;
                           this.hospitales = hospitales;
                           console.log(this.totalRegistros);
                           });
  }

  buscarHospital( termino: string ){

    if ( termino.length <= 0 ){
      this.cargarHospitales();
      return;
    }

    this.HhospitalService.buscarHospital( termino )
                         .subscribe( hospitales =>  this.hospitales = hospitales );

  }

  guardarHospital( hospital: Hospital ){

    this.HhospitalService.actualizarHospital( hospital)
                         .subscribe( );

  }
  borrarHospital( hospital: Hospital ){

    this.HhospitalService.borrarHospital( hospital._id )
                         .subscribe( () => this.cargarHospitales() );

  }

  crearHospital(){

    Swal.fire({
      title: 'Crear Hospital',
      text: 'Ingrese el nombre del hospotal',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Guardar',
      showLoaderOnConfirm: true,
      allowOutsideClick: () => !Swal.isLoading()

    }).then( (valor) => {

      if (!valor.value || valor.value.length === 0 ){
        return;
      }

      this.HhospitalService.crearHospital( valor.value )
                           .subscribe( () => this.cargarHospitales());

    });

  }

  actualizarImagen( hospital: Hospital ){

    this.MmodalUploadService.mostrarModal( 'hospitales', hospital._id );

  }

}
