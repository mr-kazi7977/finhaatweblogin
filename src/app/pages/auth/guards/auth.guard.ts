import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

import { routes } from '../../../consts';
import { TokenStorageService } from 'src/app/service/token-storage.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private tokenService: TokenStorageService
        
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
       
    //    return true;
       
        if (!this.tokenService.isAuthenticated()) {
            console.log("Token not valid :");
            
            this.router.navigate(['/login']);
           return false;
         }
         else{
            console.log("Token  valid :");
         }
         
        
       // const currentUser = this.tokenService.getUser();
       // if (currentUser) {
           // return true;
       // }

        //this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        //return false;
    }


    // I determine if the current route-request is part of a page refresh.
    private isPageRefresh() : boolean {

        // If the router has yet to establish a single navigation, it means that this
        // navigation is the first attempt to reconcile the application state with the
        // URL state. Meaning, this is a page refresh.
        return( ! this.router.navigated );

    }
}
