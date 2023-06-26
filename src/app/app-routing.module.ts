import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardPageComponent } from './pages/dashboard/containers';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import {AuthGuard} from './pages/auth/guards';
import { CdotEntryFormComponent } from './pages/cdot-entry-form/cdot-entry-form.component';
import { DetailsComponent } from './pages/details/details.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { PolicydetailComponent } from './pages/policyDetail/policydetail/policydetail.component';
import { DeclarationComponent } from './pages/declaration/declaration.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { CdotEditFormComponent } from './pages/cdot-edit-form/cdot-edit-form.component';
import { VehicleRegisternumberComponent } from './pages/vehicle-registernumber/vehicle-registernumber.component';


const routes: Routes = [
 
  {
    path: 'cdot',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    component: CdotEntryFormComponent
  },
   
   
  {
    path: 'login',
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '**',
    redirectTo: '404'
  },
  
  {
    path: 'details',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    component: DetailsComponent
  },
  {
    path: 'payment',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    component: PaymentComponent
  },
  {
    path: 'policydetail',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    component: PolicydetailComponent
  },
  {
    path: 'declaration',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    component: DeclarationComponent
  },
  {
    path: 'Reports',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    component: ReportsComponent
  },
  {
    path: 'registernumber',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    component: VehicleRegisternumberComponent
  },
  {
    path: 'edit/:id',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    component: CdotEditFormComponent
  },
 

  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
    useHash: true,
    preloadingStrategy: PreloadAllModules,
    relativeLinkResolution: 'legacy'
})
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
