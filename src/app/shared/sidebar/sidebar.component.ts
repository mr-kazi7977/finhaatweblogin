import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { routes } from '../../consts/routes';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  constructor(private auth: AuthService,){}
  
  
  ngOnInit(): void {
   this.getproduct();
    this.userSelect();
  }
  public routes: typeof routes = routes;
  public isOpenUiElements = false;
  user:any;
  public openUiElements() {
    this.isOpenUiElements = !this.isOpenUiElements;
  }

  userSelect(){
  this.user=localStorage.getItem("logtype");
 
}

productdata:any
getproduct() {
  return this.auth.getproduct().subscribe((res) => {
    // console.log("side bar to log", res);
    this.productdata=res;
  });
}
}
