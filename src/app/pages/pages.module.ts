import { NgModule } from '@angular/core';

// modulo
import { SharedModule } from '../shered/shared.module';


import { PagesComponent } from './pages.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';



@NgModule({
  declarations: [
      PagesComponent,
      DashboardComponent,
      ProgressComponent,
      Graficas1Component
    ],
    exports: [
      PagesComponent,
      DashboardComponent,
      ProgressComponent,
      Graficas1Component
    ],
    imports: [
      SharedModule
    ]
})

export class PagesModule { }
