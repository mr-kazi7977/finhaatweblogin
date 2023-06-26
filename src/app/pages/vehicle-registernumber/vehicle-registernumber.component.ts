import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { log } from 'console';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';

@Component({
  selector: 'app-vehicle-registernumber',
  templateUrl: './vehicle-registernumber.component.html',
  styleUrls: ['./vehicle-registernumber.component.css']
})
export class VehicleRegisternumberComponent implements OnInit {

  //init all class object
  userData: UserData = new UserData();

  datare: regdata = new regdata();

//   loginForm = this.fb.group({
//     vehiclenumber: ["", {
//       validators: [Validators.required, Validators.maxLength(10)]
//     }],
//     // password: ['', [Validators.required, Validators.minLength(8)]]
//  });


  constructor(private router: Router, private authService: AuthService, private toastrService: ToastrService, private tokenStorage: TokenStorageService) {

  }

  loading: Boolean = false;
  ngOnInit(): void {
    var usertype = this.tokenStorage.get('usertype')
    console.log('usertype :', usertype);
    this.userData = JSON.parse(this.tokenStorage.get('auth-user'))
    this.userData.usertype = usertype;
    this.userData.employeeId = this.userData.registrationId;
    console.log('userdata all :', this.userData);
    console.log('userdata :', this.userData.registrationId);

    var RegexAlphaNumeric = "^[a-zA-Z0-9]{6,8}|[a-zA-Z0-9]{10,12}$";
    this.loginForm = new UntypedFormGroup({
      vehiclenumber: new UntypedFormControl(null, [Validators.required,Validators.max(10)])

    });
  }

  public loginForm: UntypedFormGroup;


  //All Function

  //Get Quotes for vehicle
  getQuotes() {

    console.log('userdata :', this.userData);
    this.datare.employeeId = this.userData.employeeId;
    this.datare.usertype = this.userData.usertype;
    this.datare.regnumber=this.loginForm.value.vehiclenumber;
    if(this.loginForm.value.vehiclenumber!=null){
      this.authService.post('vehicle/user', this.datare).subscribe(data => {
        console.log(data, "");
        this.getRiscovry(data);
  
        
      })
      this.toastrService.success("Valid Login", 'Message');
    }
    else{
      this.toastrService.error("Error While Login", 'Message');
    }
   
    

  


  }
  
  // public mask = {
  //   guide: true,
  //   showMask: true,
  //   mask: [/\d/, /\d/, '-', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]
  // };

  getRiscovry(data:any){
    // console.log("return url :",data.url);

    window.open(data.url, "_self");
    
    // let f = document.createElement("form");
    // f.setAttribute("method", "GET");

    // f.setAttribute("action","https://in.finhaatinsurance.com?enc=VFsu5tsPhW5j7dUq5exBqTW5k7/GJ0hWLQy0WwVCBFxoKlytBOlulC/Kj4GxtUUG9Uk0JsYuuvKNAD9iRXtIpVrLLO+vbXfSNDHvPVIBuVmRlMiv7Bwdj4ODXOC2RQmUWw68TlsFXFFQ72ys3HzQ5jMdYFxC0MAdQrIxMkHX/fVpZGlZiVeFO3UBxAf/SP7nUPN8wr+Oacr620jgV75ER90ZkBEK7gpErNVxolLsV0Pg8HJ8RDVLwcmZNws8EOtaTYKWFIOLEYaS270Rc1SDpBCT5ZrnXdSOp3qvHp9z+AfP0/97oGtP/1PPr/PJgaFO");
    // document.body.appendChild(f);
    // f.submit();
  }

}


export class UserData {


  mobile: any;
  registrationId: any;
  usertype: any
  employeeId: any;

}

export class regdata {


  employeeId: any;
  usertype: any;
  userId: any;
  password: any;

  mobile: any;
  regnumber:any;


}





