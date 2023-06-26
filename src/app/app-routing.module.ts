import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardPageComponent } from './pages/dashboard/containers';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import {AuthGuard} from './pages/auth/guards';
import { DetailsComponent } from './pages/details/details.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { VehicleRegisternumberComponent } from './pages/vehicle-registernumber/vehicle-registernumber.component';


const routes: Routes = [
 
  // {
  //   path: 'cdot',
  //   pathMatch: 'full',
  //   canActivate: [AuthGuard],
  //   component: CdotEntryFormComponent
  // },
   
   
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
  // {
  //   path: 'policydetail',
  //   pathMatch: 'full',
  //   canActivate: [AuthGuard],
  //   component: PolicydetailComponent
  // },
  // {
  //   path: 'declaration',
  //   pathMatch: 'full',
  //   canActivate: [AuthGuard],
  //   component: DeclarationComponent
  // },
  // {
  //   path: 'Reports',
  //   pathMatch: 'full',
  //   canActivate: [AuthGuard],
  //   component: ReportsComponent
  // },
  {
    path: 'registernumber',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    component: VehicleRegisternumberComponent
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
