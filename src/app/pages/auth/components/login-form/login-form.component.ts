import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { routes } from 'src/app/consts';
import { AuthService } from 'src/app/service/auth.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  @Output() sendLoginForm = new EventEmitter<void>();
  public loginForm: UntypedFormGroup;
  showOTP: Boolean = false;
  loading: Boolean = false;
  mobilelogin: Boolean = false;
  loginModel: loginModel = new loginModel();
  public routers: typeof routes = routes;
  constructor(
    private router: Router, private authService: AuthService, private toastrService: ToastrService,
    private tokenStorage: TokenStorageService
  ) { }

  menuData: any = [];
  public ngOnInit(): void {
    //   console.log("Encrypted Password"+bcrypt.hashSync("123456", 10));

    //   bcrypt.compare("123456", "$2a$12$VHw6nTJH0PU3f9/oLseoCuLh4ll.wBszUsMcbE.knMgg.VMDvh2n.").then((res) => {
    //     console.log(res);
    // });
    this.loginForm = new UntypedFormGroup({
      mobile: new UntypedFormControl(null, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
      otp: new UntypedFormControl(null, null),
      userid: new UntypedFormControl(null),
      password: new UntypedFormControl(null),
      userType: new UntypedFormControl(null)
    });


  }

  userTypeList: any = [
    { userTypeId: 'PU', userTypeName: 'PARTNER' },
    { userTypeId: 'PO', userTypeName: 'POS' },
    { userTypeId: 'FN', userTypeName: 'FINHAAT' }
  ]
  selected = "FN";
  public sendOTP(): void {
    if (this.loginForm.valid) {
      this.loading = true;
      this.authService.post('auth/verifyLogin', this.loginForm.value).subscribe(data => {
        this.loading = false;
        if (data && data.errorCode == 100) {
          this.toastrService.success(data.errorMessage, 'Message');
          this.showOTP = true;

          this.loginForm.controls['otp'].setValidators([Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{6}$")]);
          this.loginForm.controls['otp'].updateValueAndValidity();
        } else {
          this.toastrService.error(data.errorMessage, 'Message');
        }

      })
      //this.router.navigate([this.routers.DASHBOARD]).then();
    }
  }

  request: any = {};
  public verifyOTP(): void {


    if (this.loginForm.valid) {
      this.loading = true;
      if (this.mobilelogin)
        this.loginModel.mobilelogin = "Y";
      else
        this.loginModel.mobilelogin = "N";

      this.loginModel.userId = this.loginForm.value.userid;
      this.loginModel.password = this.loginForm.value.password;
      this.loginModel.mobile = this.loginForm.value.mobile;
      this.loginModel.usertype = this.selected;
      this.loginModel.otp = this.loginForm.value.otp;
      console.log(this.loginModel);

      this.authService.post('auth/verifyLoginOTP', this.loginModel).subscribe(data => {
        this.loading = false;
        console.log("Received:" + data + "LoggedIN:" + data["loggedIn"] + "--" + data.errorCode);
        if (data && data.errorCode == 100) {
          this.toastrService.success(data.errorMessage, 'Message');
          this.showOTP = true;
          console.log(JSON.stringify(data));
          if (data["loggedIn"]) {
            sessionStorage.setItem("usertype", this.loginModel.usertype)
            this.tokenStorage.saveToken(data["jwttoken"]);
            this.request.mobile = data.mobile;
            this.tokenStorage.saveUser(data);
            console.log("data save :", data);
            this.router.navigate([this.routers.REGISTERNUMBER]).then();
            //   this.authService.getPosRegStatusById('registration/posregstatus',this.tokenStorage.getUser().registrationId).subscribe({
            //     next: data => {
            //       console.log("data.kycdocsubmit:"+data.kycdocsubmit);

            //                       if(data.kycdocsubmit=='S'&& data.bankdocsubmit=='S')
            //                       {
            //                       this.router.navigate([this.routers.DASHINDEX]).then();
            //                       }else{
            //                           this.authService.getUserInfoById('registration/getUserInfo',this.tokenStorage.getUser().registrationId).subscribe({
            //                               next: data => {
            //                                 this.tokenStorage.saveUser(data);
            //                                   this.router.navigate([this.routers.DASHBOARD]).then();
            //                               }
            //                           });

            //               }


            //     }
            // });

          } else {
            this.showOTP = false;
            this.toastrService.error("Error While Login", 'Message');
          }



        } else {
          this.showOTP = false;
          this.toastrService.error(data.errorMessage, 'Message');
        }

      })
    }

  }

  public login(): void {
    //alert("login")

    this.tokenStorage.removeToken();
    this.tokenStorage.remove("usertype");
    this.tokenStorage.remove("auth-user");

    this.loading = true;
    // console.log(this.mobilelogin)

    if (this.mobilelogin)
      this.loginModel.mobilelogin = "Y";
    else
      this.loginModel.mobilelogin = "N";

    this.loginModel.userId = this.loginForm.value.userid;
    this.loginModel.password = this.loginForm.value.password;
    this.loginModel.mobile = this.loginForm.value.mobile;
    this.loginModel.usertype = this.selected;
    console.log("login model :", this.loginModel);
    sessionStorage.setItem("usertype", this.loginModel.usertype)
    this.authService.post('auth/login', this.loginModel).subscribe(data => {
      this.loading = false;
      console.log("received:" + JSON.stringify(data))
      console.log("loggedIn:" + data["loggedIn"])
      // this.tokenStorage.saveinSession("sessionuser",data);
      console.log("jwttoken:" + data["jwttoken"])
      if (data && data.errorCode == 100) {
        this.toastrService.success(data.errorMessage, 'Message');
        if (data["loggedIn"]) {
          this.tokenStorage.saveToken(data["jwttoken"]);
          this.request.mobile = data.mobile;
          this.tokenStorage.saveUser(data);
          this.router.navigate([this.routers.REGISTERNUMBER]).then();
          if (this.selected == 'PO') {
            // this.router.navigate([this.routers.DASHBOARD]).then();
          } else {
            // console.log("side bar current log:",this.currentlog);
            // if (this.currentlog === 'Ops Mis') {
            //   this.router.navigate([this.routers.OFFLINEPOLICYUPLOAD]).then();

            // }else{
            //   this.router.navigate([this.routers.OFFLINEPOLICYVIEW]).then();
            // }

            // this.authService.get("registration/getMenu").subscribe(data => {
            //   console.log("data menu"+data[0]?.menuRoute)
            //   this.menuData=data;
            //   data.forEach(element => {
            //     console.log("menu data:",element?.menuRoute);

            //     this.router.navigate([element?.menuRoute]).then();
            //   });

            // })

          }

        } else {
          this.showOTP = false;
          this.toastrService.error("Error While Login", 'Message');
        }
      } else {
        this.toastrService.error("User Not Register", 'Message');
      }

    })
    //this.router.navigate([this.routers.DASHBOARD]).then();

  }

  public mobileLoginUncheck(): void {
    this.mobilelogin = false;
  }

}
export class loginModel {
  mobilelogin: any;
  userId: any;
  password: any;
  mobile: any;
  otp: any;
  usertype: any;
}