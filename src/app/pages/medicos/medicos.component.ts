import { Component, OnInit } from '@angular/core';
import { MedicoService } from 'src/app/services/service.index';
import { Medico } from 'src/app/models/medico.model';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit {

  medicos: Medico[] = [];

  constructor(
    public MmedicoService: MedicoService,
  ) { }

  ngOnInit(): void {

    this.cargarMedicos();
  }

  cargarMedicos(){

    this.MmedicoService.cargarMedicos()
                       .subscribe(
                         medicos => this.medicos = medicos
                       );

  }

}
