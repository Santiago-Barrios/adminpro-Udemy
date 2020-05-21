import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from 'src/app/models/hospital.model';
import { MedicoService } from '../../services/medico/medico.service';
import { HospitalService } from '../../services/service.index';
import { Medico } from 'src/app/models/medico.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];
  medico: Medico = new Medico('', '', '', '', '');
  hospital: Hospital = new Hospital('');

  constructor(
    public MmedicoService: MedicoService,
    public HhospitalService: HospitalService,
    public router: Router,
    public ActivateRouter: ActivatedRoute,
   ) {

    ActivateRouter.params.subscribe( params => {

      const id = params.id;

      if (id !== 'nuevo' ){
        this.cargarMedico(id);
      }

    });

    }

  ngOnInit(): void {

    this.HhospitalService.cargarHospitales()
                         .subscribe( hospitales => this.hospitales = hospitales );
  }

  cargarMedico( id: string){

    this.MmedicoService.cargarMedico(id)
                       .subscribe( medico => {

                        console.log(medico);
                        this.medico = medico;
                        this.medico.hospital = medico.hospital._id;
                        this.cambioHospital( this.medico.hospital );
                      });

  }

  guardarMedico( f: NgForm ){

    console.log(f.valid);
    console.log(f.value);

    if ( f.invalid ){
      return;
    }

    this.MmedicoService.guardarMedico( this.medico )
                       .subscribe( medico => {

                        this.medico._id = medico._id;

                        this.router.navigate( ['/medico', medico._id] );
                        console.log(medico);
                       });

  }

  cambioHospital( id: string ){

    this.HhospitalService.obtenerHospital(id)
                         .subscribe( hospital => this.hospital = hospital);

  }

}
