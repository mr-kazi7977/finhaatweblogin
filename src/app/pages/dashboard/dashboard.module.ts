import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
//import { NgxEchartsModule } from 'ngx-echarts';
import { TrendModule } from 'ngx-trend';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
//import { NgApexchartsModule } from 'ng-apexcharts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

import { DashboardPageComponent } from './containers';

import { SharedModule } from '../../shared/shared.module';
import { DashboardService } from './services';
import { MatTabsModule } from '@angular/material/tabs';
import { MatStepperModule } from '@angular/material/stepper';
import { MAT_DATE_LOCALE, NativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MaterialFileInputModule } from 'ngx-mat-file-input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatFormFieldModule} from '@angular/material/form-field';





@NgModule({
  declarations: [
    DashboardPageComponent,
    
   
  ],
  imports: [
    CommonModule,
    MatTableModule,
   // NgxEchartsModule,
    TrendModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatGridListModule,
    MatSelectModule,
    MatInputModule,
    //NgApexchartsModule,
    FormsModule,
    SharedModule,
    MatTabsModule,
    MatStepperModule,
    ReactiveFormsModule,
    NativeDateModule,
    MatDatepickerModule,
    MatDividerModule,
    MaterialFileInputModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatSnackBarModule,
    MatFormFieldModule,
   
  ],
  exports: [
  ],
  providers: [
    DashboardService,DashboardPageComponent,
   
  ]
})
export class DashboardModule { }
