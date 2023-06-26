import { Injectable, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  getuser(managerId: number) {
    throw new Error('Method not implemented.');
  }
  constructor(private http: HttpClient, private _ngZone: NgZone) { }

  post(url: any, data: any): Observable<any> {
    console.log(environment.AUTH_API + url);
    console.log('need ',data)
    return this.http.post(environment.AUTH_API + url, data,httpOptions).pipe(map(user => {
      return user;
    }))
    // return this.http.post(`${environment.AUTH_API + url}`, data, httpOptions);
  }

  postlogin(url: any, data: any): Observable<any> {
    console.log(environment.AUTH_API + url);
    console.log(data)
    return this.http.post(environment.AUTH_API + url, data).pipe(map(user => {
      return user;
    }))
    // return this.http.post(`${environment.AUTH_API + url}`, data, httpOptions);
  }

  
  async asyncpost(url: any, data: any): Promise<any> {
    const promise = new Promise<void>((resolve, reject) => {
      const apiURL = environment.AUTH_API + url;
      this.http.post<any>(apiURL, data).subscribe({
        next: (res: any) => {

          resolve(res);
        },
        error: (err: any) => {
          reject(err);
        },
        complete: () => {
          console.log('complete');
        },
      });
    });
    return promise;
  }


  updateuser(url: any, data: any, id: any): Observable<any> {
   
    return this.http.post(`${environment.AUTH_API + url}/${id}`, data, httpOptions).pipe(map(user => {
      return user;
    }))
    
  }

  get(url: any): Observable<any> {
    return this.http.get(environment.AUTH_API + url);
  }

  // pospost(url: any, data: any): Observable<any> {
  
  //   return this.http.post(environment.POS_API + url, data).pipe(map(user => {
  //     return user;
  //   }))
    
  // }

  docPost(url: any, formData: FormData): Observable<any> {
    console.log(formData)
    return this.http.post(environment.AUTH_API + url, formData);
  }

  getKycById(url: any, id: any): Observable<any> {
    console.log(`${environment.AUTH_API + url}/${id}`)
    return this.http.get<any>(`${environment.AUTH_API + url}/${id}`);
  }

  getuserList(data:any): Observable<any> {
    return this.http.get(environment.AUTH_API + 'userList/'+data)
  }

  getproduct() {
    return this.http.get(environment.AUTH_API + 'getproduct');
  }
  getproductlist() {
    return this.http.get(environment.AUTH_API + 'getproductlist');
  }
  getRelationship() {
    return this.http.get(environment.AUTH_API + 'getrelationship');
  }


  getinsured(user: any) {
    return this.http.get(environment.AUTH_API + 'getinsured/' + user)
  }
  getcityById(id: any): Observable<any> {
    console.log(`${environment.AUTH_API}/${id}`)
    return this.http.get<any>(`${environment.AUTH_API}${id}`);
  }

  Excelldata(url:any,stardate: any,partner:any): Observable<any> {
    // return this.http.post<any>(`${environment.AUTH_API + url}/${stardate}/${partner}`);
    
    return this.http.get<any>(`${environment.AUTH_API+url}/${stardate}/${partner}`);
  }


  Exportexcelfile(data: any) {
    return this.http.post(environment.AUTH_API + 'excel/export', data)
  }

  getpartner() {
    return this.http.get(environment.AUTH_API + 'partnername')
  }
  
  getpartnerdata() {
    return this.http.get(environment.AUTH_API + 'partnerdata')
  }
  getfilinsured(data: any) {
    return this.http.post(environment.AUTH_API + 'getinsured', data)
  }
  getEditedData(url: any,id:any,data:any){
    return this.http.get<any>(`${environment.AUTH_API + url}/${id}`,data);
  }


  getproductbycompany(companyid: any) {
    return this.http.get(environment.AUTH_API + 'getproductbycomapny/' + companyid);
  }



 edituser( id: any,data: any ): Observable<any> {
    console.log(environment.AUTH_API );
    console.log(data)
    // return this.http.post(`${environment.AUTH_API}/${url}/${id}`,data)
    return this.http.post(environment.AUTH_API + 'editcoi/'+id, data)
    // return this.http.post(`${environment.AUTH_API + url}`, data, httpOptions);
  }

 

}

