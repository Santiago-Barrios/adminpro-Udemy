import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from 'src/app/models/hospital.model';
import { MedicoService } from '../../services/medico/medico.service';
import { HospitalService } from '../../services/service.index';
import { Medico } from 'src/app/models/medico.model';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];
  medico: Medico = new Medico();

  constructor(
    public MmedicoService: MedicoService,
    public HhospitalService: HospitalService,
   ) { }

  ngOnInit(): void {

    this.HhospitalService.cargarHospitales()
                         .subscribe( hospitales => this.hospitales = hospitales );
  }

  guardarMedico( f: NgForm ){

    console.log(f.valid);
    console.log(f.value);

    if ( f.invalid ){
      return;
    }

    this.MmedicoService.guardarMedico( this.medico )
                       .subscribe( medico => {
                         console.log(medico);
                       });

  }

}
