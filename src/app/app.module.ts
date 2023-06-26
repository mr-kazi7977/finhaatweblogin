import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { DashboardModule } from './pages/dashboard/dashboard.module';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AuthModule } from './pages/auth/auth.module';
//import { NgxEchartsModule } from 'ngx-echarts';
import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatStepperModule} from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import {MatDividerModule} from '@angular/material/divider';
import { MaterialFileInputModule } from 'ngx-mat-file-input';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {  HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './pages/auth/guards/auth.interceptor';
import { ErrorInterceptor } from './pages/auth/guards/error.interceptor';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { MatDialogModule } from '@angular/material/dialog';
import { DetailsComponent } from './pages/details/details.component';
import { PaymentComponent } from './pages/payment/payment.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { NgxSpinnerModule } from "ngx-spinner";
import { SpinnerOverlayComponent } from './pages/spinner-overlay/spinner-overlay.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { SpinnerInterceptor } from './service/spinner.interceptor';
import { OtpmodalComponent } from './pages/otpmodal/otpmodal.component';
import { MAT_DATE_LOCALE, NativeDateModule } from '@angular/material/core';
import { CommonModule, DatePipe } from '@angular/common';
//import { NgxEchartsModule } from 'ngx-echarts';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';

import {MatFormFieldModule} from '@angular/material/form-field';
// import { ReportsComponent } from './pages/reports/reports.component';
import { PaymentReceiptComponent } from './pages/payment-receipt/payment-receipt.component';
import { VehicleRegisternumberComponent } from './pages/vehicle-registernumber/vehicle-registernumber.component';

import { TextMaskModule } from 'angular2-text-mask';




const TOKEN_KEY = 'auth-token';
export function tokenGetter() {
  return window.sessionStorage.getItem(TOKEN_KEY);
}
@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    DetailsComponent,
    PaymentComponent,
    SpinnerOverlayComponent,
    OtpmodalComponent,
    // ReportsComponent,
    PaymentReceiptComponent,
    VehicleRegisternumberComponent,
    
    











  ],
  imports: [
    BrowserModule,
    SharedModule,
    AuthModule,
    DashboardModule,
    BrowserAnimationsModule,
    RouterModule,
    AppRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    }),
    MatAutocompleteModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatStepperModule,
    MatTabsModule,
    MatDividerModule,
    MaterialFileInputModule,
    MatButtonToggleModule,
    HttpClientModule,
    MatDialogModule,
    MatExpansionModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatCheckboxModule,
    NativeDateModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatToolbarModule,
    NgxSpinnerModule  ,
    MatFormFieldModule,
    TextMaskModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter
      }
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor , multi: true },
    JwtHelperService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }