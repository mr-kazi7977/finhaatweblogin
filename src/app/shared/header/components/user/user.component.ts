import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';

import { routes } from '../../../../consts';
import { User } from '../../../../pages/auth/models';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  @Input() user: User;
  @Output() signOut: EventEmitter<void> = new EventEmitter<void>();
  public routes: typeof routes = routes;
  public flatlogicEmail: string = "https://finhaat.com";
  constructor(private tokenStorageService:TokenStorageService,private auth: AuthService){

  }
  
  ngOnInit(): void {
    this.getproduct();
   
   }
  userId:any=this.tokenStorageService.getUser().name;

  public signOutEmit(): void {
    this.tokenStorageService.removeToken();
    this.signOut.emit();
  }
  productdata:any;
  getproduct() {
    return this.auth.getproduct().subscribe((res) => {
      // console.log("side bar to log", res);
      this.productdata=res[0].companyid;
      console.log("img res",res);
      
    });
  }
}
