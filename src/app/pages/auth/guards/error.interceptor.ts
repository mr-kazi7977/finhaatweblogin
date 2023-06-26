import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/service/token-storage.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor( private router: Router,private tokenStorage:TokenStorageService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
          //  alert(err.status)
            if(err.status==0){
                // console.log("error status code:"+err.status)
                this.tokenStorage.signOut();
                this.router.navigate(['login']);
            }else{
            // console.log("HTTP Response received:"+JSON.stringify(err));
            // console.log("request:"+JSON.stringify(request));
            if (!request.url.endsWith('doLogin')) {
                this.tokenStorage.signOut();
                if (err.status === 401) {
                    ///debugger
                    // auto logout if 401 response returned from api
                    // console.log("HTTP Response received: unauthorized");
                    if (!request.url.endsWith('dologout')) {
                      
                        this.router.navigate(['login']);
                    }
                    else {
                        this.tokenStorage.signOut;
                        this.router.navigate(['login']);
                    }


                }
                else if (err.status === 400) {
                    this.router.navigate(['login']);
                }
                else if (err.status === 500) {
                    this.router.navigate(['login']);
                }
                else if (err.status === 504) {

                    this.router.navigate(['login']);
                }
                const error = err.error.message || err.statusText;
                return throwError(error);

            }else{
                this.tokenStorage.signOut;
                this.router.navigate(['login']);
            }
        }
            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }

    // intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //     return next.handle(request).pipe(catchError(err => {

    //         if (!request.url.endsWith('doLogin')) {
    //             if (err.status === 401) {
    //                 ///debugger
    //                 // auto logout if 401 response returned from api
    //                 if (!request.url.endsWith('dologout')) {
    //                    // this.loginService.logout();
    //                     this.router.navigate(['login']);
    //                 }
    //                 else {
    //                     this.router.navigate(['login']);
    //                 }


    //             }
    //             else if (err.status === 400) {
    //                 this.router.navigate(['login']);
    //             }
    //             else if (err.status === 500) {
    //                 this.router.navigate(['login']);
    //             }
    //             else if (err.status === 504) {

    //                 this.router.navigate(['login']);
    //             }
    //             const error = err.error.message || err.statusText;
    //             return throwError(error);

    //         }
    //         const error = err.error.message || err.statusText;
    //         return throwError(error);
    //     }))
    // }
}