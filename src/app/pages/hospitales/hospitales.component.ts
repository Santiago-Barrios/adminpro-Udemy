import { Component, OnInit } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from '../../services/service.index';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit {

  constructor(
    public HhospitalService: HospitalService
   ) { }

   hospitales: Hospital[] = [];

  ngOnInit(): void {
      this.cargarHospitales();
  }

  cargarHospitales(){
    this.HhospitalService.cargarHospitales()
                         .subscribe( hospitales => this.hospitales = hospitales );
  }

  buscarHospital(){

  }

  guardarHospital( hospital: Hospital ){

  }
  borrarHospital( hospital: Hospital ){

  }

}
