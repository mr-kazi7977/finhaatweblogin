import * as moment from 'moment';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { Router } from '@angular/router';
import { routes } from 'src/app/consts';
import { MatSelect } from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';
import { DashboardPageComponent } from '../dashboard/containers';
import { MatSnackBar } from '@angular/material/snack-bar';
import { resolve } from 'dns';
import { __await } from 'tslib';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';

import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
// import {default as _rollupMoment} from 'moment';
import { MY_FORMATS } from '../../pages/dashboard/consts/myformats'
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { stringify } from 'querystring';

// const momentobj = _rollupMoment || _moment;

@Component({
  selector: 'app-cdot-entry-form',
  templateUrl: './cdot-entry-form.component.html',
  styleUrls: ['./cdot-entry-form.component.css'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ]
})
export class CdotEntryFormComponent implements OnInit {


  validateForm: any;
  optionValue: any = 'No';
  insured: any;
  selectProduct: any;
  selectRelationship: any = 'Self';
  selectRelationship1: any = 'select';
  public selectedProject: project = new project();
  form!: FormGroup;

  containers: any = []
  public routers: typeof routes = routes;
  constructor(private router: Router, private fb: FormBuilder, private auth: AuthService, private toastrService: ToastrService, private tokenStorage: TokenStorageService, public dialog: MatDialog, private dash: DashboardPageComponent, private snackBar: MatSnackBar,) { }

  add() {
    this.containers.push(this.containers.length)

  }

  register(registerForm: any) {

    // console.log(registerForm.value)
    registerForm.reset()
  }



  ngOnInit(): void {
    this.creatForm();
    this.getproduct();
    this.getOccupation();
    this.getNomRelation();
    this.getRelationship();
    // this.insureds.clear();


  }




  scode: any;
  hideshow;
  scode2
  disabledfemale;
  policytypeselect;
  suminsured;
  suminsuredicu;
  premiumadult?;
  premiumchild?;
  totalpremium;
  disabledcolor: string;
  relation: any;

  adddata(data: any) {
    // console.log("id is here", data.policytype);
    // console.log(data);
    this.suminsured = data.suminsured;
    this.suminsuredicu = data.suminsuredicu;
    this.premiumadult = data.premiumadult;
    this.premiumchild = data.premiumchild;
    this.totalpremium = this.premiumadult;
    if (data.policytype == 'F') {
      this.hideshow = false
      this.policytypeselect = data.policytype
      this.disabledfemale = false
      this.disabledcolor = "button"
    }
    // else {
    if (data.policytype == 'W') {
      this.policytypeselect = data.policytype
      this.hideshow = true
      this.scode2 = 'female'
      this.disabledfemale = true;
      this.disabledcolor = "discolor"
    }
    this.insureds.clear();
    this.insureds.push(this.insuredFrom());
    this.openSnackBar();
  }
  dist(data: any) {
    // console.log("id is here", data);
    // if (data == '121') {
    //   this.hideshow = false
    //   this.genderselect = data
    //   this.scode3=false
    // } 
    // // else {
    //   if(data =='152'){
    //     this.genderselect = data
    //   this.hideshow = true
    //   this.scode2='female'
    //   this.scode3=true
    // }
  }

  selectpro: any;
  getproduct() {
    return this.auth.getproduct().subscribe((res) => {
      // console.log("welcome to log", res);
      this.selectpro = res
      this.selectProduct = res[0].productname;
      this.scode = res[0].productcode;
      this.adddata(res[0])
      this.dist(res[0])
      //   
      //   this.scode=res[0].productcode;
      //   this.suminsured = res[0].suminsured;
      //   this.suminsuredicu = res[0].suminsuredicu;
      //   this.premiumadult = res[0].premiumadult;
      //   this.premiumchild = res[0].premiumchild;
      //  this.totalpremium=this.premiumadult;
      //   this.policytypeselect=res[0].data.policytype

      // localStorage.setItem("porduct", JSON.stringify(res));
    })
  }
  getRelationship() {
    return this.auth.getRelationship().subscribe((res) => {
      // console.log("Relationship fetched", res);
      this.relation = res;
      this.relation.splice(1,1);
    })
  }
  // minoropt: string[] = ['YES', 'NO'];
  nomgenderopt: string[] = ['Male', 'Female', 'Others']
  doctype: string[] = ['Aadhar Card', 'Driving License', 'Voter ID', 'Others'];
  heightdata: string[] = ["1.0", "1.1", "1.2", "1.3", "1.4", "1.5", "1.6", "1.7", "1.8", "1.9", "1.10", "1.11", "2.0", "2.1", "2.2", "2.3", "2.4", "2.5", "2.6", "2.7", "2.8", "2.9", "2.10", "2.11", "3.0", "   3.1", "3.2", "3.3", "3.4", "3.5", "3.6", "3.7", "3.8", "3.9", "3.10", "3.11", "4.0", "4.1", "4.2", "4.3", "4.4", "4.5", "4.6", "4.7", "4.8", "4.9", "4.10", "4.11", "5.0", "5.1", "5.2", "5.3", "5.4", "5.5", "5.6", "5.7", "5.8", "5.9", "5.10", "5.11", "6.0"
    , "6.1", "6.2", "6.3", "6.4", "6.5", "6.6", "6.7", "6.8", "6.9", "6.10", "6.11", "7.0"]
  //relation: string[] = ['Self', 'Spouse', 'Father', 'Mother', 'Child', 'Dependent Child']

  creatForm() {
    this.form = this.fb.group(
      {
        // occupation: ['', [Validators.required]],

        // docnumber: ['', [Validators.required]],
        // nomname: ['', [Validators.required]],
        // nommobile: ['', [Validators.required, Validators.pattern("[0-9]{10}")]],
        // minor: ['no', [Validators.required]],
        // tenure: [{ value: '12', disabled: true }],


        // address: ['', [Validators.required]],
        // city: ['', [Validators.required]],
        // state: ['', [Validators.required]],
        // district: ['', [Validators.required]],
        // pincode: ['', [Validators.required, Validators.maxLength(6)]],
        // nomirelation: [''],
        // nomguardname: [''],
        // nomage: [''],
        // nomDob: [''],
        // nomguardage: [''],
        // guardrelation: [''],
        // nomgender: [''],
        // doctype: ['', [Validators.required]],
        // insureds: this.fb.array([this.insuredFrom()])

        occupation: ['', [Validators.required]],
        // document: ['', [Validators.required]],
        docnumber: ['', [Validators.required]],
        mobile: ['', [Validators.required, Validators.pattern("[0-9]{10}")]],
        email: ['', [Validators.required, Validators.email, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$")]],
        nomname: ['', [Validators.required]],
        //minor: ['', [Validators.required]],
        tenure: [{ value: '12', disabled: true }],
        product: [''],
        // nommobile: ['8578554587', [Validators.required, Validators.pattern("[0-9]{10}")]],
        //policydate: ['', [Validators.required]],
        address: ['', [Validators.required]],
        city: ['', [Validators.required]],
        state: [[Validators.required]],
        district: ['', [Validators.required]],
        pincode: ['', [Validators.required, Validators.maxLength(6)]],
        nomirelation: ['', [Validators.required]],
        nomguardname: [''],
        nomage: [''],
        nomDob: ['', [Validators.required]],
        nomguardage: [''],
        guardrelation: [''],
        nomgender: ['', [Validators.required]],
        doctype: ['', [Validators.required]],
        insureds: this.fb.array([this.insuredFrom()])

      }
    );
  }

  public birthdate: Date;
  public age: number;
  date: any;
  date1: any;

  adddate() {

  }

  public calculateAge(birthdate: any): number {
    // console.log(birthdate)
    return moment().diff(birthdate, 'years');
  }



  modelChanged(date) {
    var theDate = new Date(Date.parse(date));
    const localDate = theDate.toLocaleString().split(" ");

    // console.log(localDate);
  }




  get insureds() {
    return this.form.get("insureds") as FormArray;
  }

  insuredFrom() {
    return this.fb.group(
      {
        name: ['', [Validators.required]],
        fathername: ['', [Validators.required]],
        gender: ['', [Validators.required]],
        dateinsured: ['', [Validators.required]],
        // mobile: ['5845457854', [Validators.required, Validators.pattern("[0-9]{10}")]],
        // email: [null, [Validators.required,
        // Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
        // email: ['mkhj'],
        relation: ["R001", [Validators.required]],
        height: [''],
        weight: [''],
        // name: ['', [Validators.required]],
        // fathername: ['', [Validators.required]],
        // gender: ['', [Validators.required]],
        // dateinsured: [null],
        // mobile: ['', [Validators.required, Validators.pattern("[0-9]{10}")]],
        // // email: [null, [Validators.required,
        // // Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
        // email: [''],
        // relation: ["Self", [Validators.required]],
      }
    );
  }

  addInsured() {
    if (this.scode == '' || this.scode == null) {
      // alert("please select product")
      this.snackBar.open("please select product", "ok", {
        duration: 3000
      })
    } else {
      this.insureds.push(this.insuredFrom());
      this.secondeinsured = true;
      this.openSnackBar();
    }


  }

  enddatepolicy = new Date;
  startpolicy: any;

  
  notdependent: number = 100;

  
  i: number = 0;
  SelectedDate: any;
  async validateAge(element: any): Promise<any> {

    const promise = new Promise<void>(async (resolve, reject) => {


      let ageresult: any = 99;

      let insuredLength: number = this.form.value.insureds.length;
      try {
        // console.log("Loop VAlue:" + this.i)
        if (element == null)
          element = this.form.value.insureds[this.i];
        // this.form.value.insureds.forEach(
        //  async element => {
        // console.log(element.relation)

        if (element.relation == 'R003' || element.relation == 'R004') {
          this.notdependent = 99;
          // console.log(JSON.stringify(element.dateinsured))
          let dobObj: dobModel = new dobModel();
          dobObj.dob = element.dateinsured;
          await this.auth.asyncpost("validatedependentage", dobObj).then(async result => {
            // console.log("result :" + result as string)
            ageresult = JSON.stringify(result);
            this.i++;
            if (ageresult == 100 && this.i < insuredLength) {
              // async element => {
              await this.validateAge(this.form.value.insureds[this.i]).then(
                value => {
                  resolve(value);
                }
              );
              //  }   
            } else {
              resolve(ageresult);
            }


          })

        } else {
          this.notdependent = 99;
          let dobObj: dobModel = new dobModel();
          dobObj.dob = element.dateinsured;
          console.log(dobObj)
          await this.auth.asyncpost("validateage", dobObj).then(async result => {
            // console.log("result :" + result as string)
            ageresult = JSON.stringify(result);
            this.i++;
            if (ageresult == 100 && this.i < insuredLength) {
              // async element => {
              await this.validateAge(this.form.value.insureds[this.i]).then(
                value => {
                  resolve(value);
                }
              );
              //}   
            } else {
              resolve(ageresult);
            }

          })

        }






      } catch (err) {
        console.error(err);


      }
    });



    // if(i==0)
    return promise;
  }
  mydate:Date;
  selecteddate:any;
  ageresult: any ;
  public dateselect(event: MatDatepickerInputEvent<Date>): void {
    //console.log('Teste', event.value);
   
    this.auth.asyncpost("validateNomineeAge", event.value).then(async result => {
     
      this.ageresult = JSON.stringify(result);
      
    })


  }

maxdate=new Date();



  async save(): Promise<any> {

    this.formvalidate();
    // console.log("form validation :" + this.form.valid)
    // this.age = this.calculateAge(this.form.value.nomDob);
    // console.log("policy start" + this.startpolicy)

    // this.form.patchValue({
    //   nomage: this.age
    // })

    if (this.form.valid) {

      // this.form.value.insureds.forEach(async element => {
      //   console.log(element.relation)

      //   await this.validateAge(element).then(
      //     value=>{
      //       this.notdependent=value;
      //       console.log("value received in validate age:"+this.notdependent)
      //     }
      //   );


      // });
      this.i = 0
      await this.validateAge(null).then(
        value => {
          this.notdependent = value;
           console.log("value received in validate age:" + this.notdependent)
          this.savecoi();

        }
      );

    }
  }

  savecoi() {

    // console.log(this.notdependent)
    if (this.notdependent == 100) {
      this.form.controls.product.setValue(this.scode);
      this.auth.post("initiatecoi", this.form.getRawValue()).subscribe(data => {

        if (data && data.errorCode == 100) {
          this.toastrService.success(data.errorMessage, 'Message');
          this.tokenStorage.save("proposalid", data.proposalid);
          sessionStorage.setItem("insured", JSON.stringify(this.form.value.insureds))
          this.tokenStorage.save("coidata", JSON.stringify(this.form.getRawValue()))
          // this.router.navigate([this.routers.DETAILS]).then();
          this.router.navigate([this.routers.DECLARATION]).then();
        } else {
          this.toastrService.error(data.errorMessage, 'Message');
        }

      });
    }
    else if (this.notdependent == 101) {

      this.toastrService.error("DEPENDED CHILD AGE SHOULD BE BETWEEN 3 MONTHS TO 25 YRS", 'Message')

    }
    else if (this.notdependent == 102) {

      this.toastrService.error("INSURED AGE SHOULD BE BETWEEN 18 Yrs TO 70 Yrs", 'Message')

    }
  }


  primary;
  secondeinsured;
  relprimaryfilter(): any {
    let prelation: any;
    // console.log("going to Add premium:" + this.totalpremium);
    this.totalpremium = 0;
    this.form.value.insureds.forEach(element => {
      // console.log("Adding premium:" + this.totalpremium);
      prelation = element.relation;
      // console.log("relationship:" + prelation);

      if (prelation == "R003" || prelation == "R004") {
        this.totalpremium = parseFloat(this.totalpremium) + parseFloat(this.premiumchild);

      } else {
        this.totalpremium = parseFloat(this.totalpremium) + parseFloat(this.premiumadult);

      }



    });
    return this.totalpremium;


  }

  openSnackBar() {
    this.totalpremium = this.relprimaryfilter();
    // console.log(this.totalpremium);
    this.snackBar.open("TotalPremium :", this.totalpremium, {
      duration: 3000
    });

  }

  removeitem(itemid) {
    //alert(itemid)
    if (itemid > 0) {
      this.insureds.removeAt(itemid)
      this.openSnackBar();
    }

  }
  public locationData: pinCodeLocations = new pinCodeLocations();
  getpincode(num1: any) {
    //  return alert(num1)
    // console.log(num1);

    if (num1.length == 6) {
      this.auth.getcityById("locationdata/" + num1).subscribe(data => {
        if (data != null) {
          // console.log("pin--" + JSON.stringify(data));
          // this.citybyid = data
          // this.states=data;
          // this.dist=data;
          // this.city=data;
          this.locationData = data
          // console.log("localtion" + JSON.stringify(this.locationData));
        } else {
          // alert("please enter valid pincode");
          this.toastrService.error("Please Enter Valid Pincode");
        }
      })
    }


  }
  addlimit(limit){
    // console.log("length:",limit.length);
    if(limit.length>49){
      this.toastrService.error("Address character limit is 50")
    }
    
  }
  nomrelation: any
  getNomRelation() {
    this.auth.get("nomrelation").subscribe(data => {
      // console.log("nomrelation--" + JSON.stringify(data));
      this.nomrelation = data;
      this.nomrelation.splice(1,1);
    })
  }
  occupation;
  getOccupation() {
    this.auth.get("occupation").subscribe(data => {
      // console.log("occ--"+JSON.stringify(data));
      this.occupation = data;
    })
  }


  navbarfixed = false
  @HostListener('window.scroll', ['$event']) onscroll() {
    if (window.screenY > 100) {
      this.navbarfixed = true;
    } else {
      this.navbarfixed = false;
    }
  }
  // form validation check
  check = false;
  formvalidate() {
    // console.log(this.form.value.insureds.length);
    var i = 1;

    this.form.value.insureds.forEach(x => {
      // console.log(x);
      this.check = false;
      if (x.name == null || x.name == "" || x.name == undefined) {
        this.toastrService.warning("Please Enter Insured Person "+ i+ ": name"+" कृपया बीमित व्यक्ति दर्ज करें " + i + ": नाम", " ", {
          positionClass: 'toast-top-right',
          progressBar: true,
          // sprogressAnimation:"increasing",
        });

      } else if (x.fathername == null || x.fathername == "" || x.fathername == undefined) {
        this.toastrService.warning("Please Enter Insured Person "+ i+ ": Fathername"+" कृपया बीमित व्यक्ति दर्ज करें " + i + ": पिता का नाम", " ", {
          positionClass: 'toast-top-right',
          progressBar: true,
          // sprogressAnimation:"increasing",
        });
      } else if (x.gender == null || x.gender == "" || x.gender == undefined) {
        this.toastrService.warning("Please Enter Insured Person "+ i+ ": Gender"+" कृपया बीमित व्यक्ति दर्ज करें " + i + ": लिंग ", "", {
          positionClass: 'toast-top-right',
          progressBar: true,
          // sprogressAnimation:"increasing",
        });
      } else if (x.dateinsured == null || x.dateinsured == "" || x.dateinsured == undefined) {
        this.toastrService.warning("Please Enter Insured Person "+ i+ ": DOB"+" कृपया बीमित व्यक्ति दर्ज करें " + i + ": जन्म तिथि ", "", {
          positionClass: 'toast-top-right',
          progressBar: true,
          // sprogressAnimation:"increasing",
        });
      } else if (x.relation == null || x.relation == "" || x.relation == undefined) {
        this.toastrService.warning("Please Enter Insured Person "+ i+ ": Relation"+" कृपया बीमित व्यक्ति दर्ज करें " + i + ": संबंध ", "", {
          positionClass: 'toast-top-right',
          progressBar: true,
          // sprogressAnimation:"increasing",
        });
      }
      // else if (x.height == null || x.height == "" || x.height == undefined) {
      //   this.toastrService.warning("Please Enter Insured Person"+i+":Height ", "", {
      //     positionClass: 'toast-top-right',
      //     progressBar: true,
      //     // sprogressAnimation:"increasing",
      //   });
      // } else if (x.weight == null || x.weight == "" || x.weight == undefined) {
      //   this.toastrService.warning("Please Enter Insured Person "+i+":weight " , "", {
      //     positionClass: 'toast-top-right',
      //     progressBar: true,
      //     // sprogressAnimation:"increasing",
      //   });
      // }
      i++;

    })
    if (this.form.get("insureds").invalid) {
      return;
    }


    if (this.ageresult == 100) {
      this.form.controls["nomguardname"].clearValidators();
      this.form.controls['nomguardname'].updateValueAndValidity();
      this.form.controls["nomguardage"].clearValidators();
      this.form.controls['nomguardage'].updateValueAndValidity();
      this.form.controls["guardrelation"].clearValidators();
      this.form.controls['guardrelation'].updateValueAndValidity();
      this.form.patchValue({
        nomguardname: "",
        nomguardage: "",
        guardrelation: ""
      })
    }

    if (this.form.value.occupation == "" || this.form.value.occupation == null) {
      this.toastrService.warning("Please Enter Occupation कृपया पेशा दर्ज करें ", "", {
        positionClass: 'toast-top-right',
        progressBar: true,
      });

    } else if (this.form.value.doctype == "" || this.form.value.doctype == null) {
      this.toastrService.warning("Please Enter Document Type कृपया दस्तावेज़ प्रकार दर्ज करें ", "", {
        positionClass: 'toast-top-right',
        progressBar: true,
      });
    } else if (this.form.value.docnumber == "" || this.form.value.docnumber == null) {
      this.toastrService.warning("Please Enter Document Number कृपया दस्तावेज़ संख्या दर्ज करें ", "", {
        positionClass: 'toast-top-right',
        progressBar: true,
      });
    } else if (this.form.value.mobile == "" || this.form.value.mobile == null) {
      this.toastrService.warning("Please Enter Mobile Number कृपया मोबाइल नंबर दर्ज करें ", "", {
        positionClass: 'toast-top-right',
        progressBar: true,
      });
    } else if (this.form.value.email == "" || this.form.value.email == null) {
      this.toastrService.warning("Please Enter Email कृपया ईमेल दर्ज करें ", "", {
        positionClass: 'toast-top-right',
        progressBar: true,
      });
    } else if (this.form.value.nomname == "" || this.form.value.nomname == null) {
      this.toastrService.warning("Please Enter Nominee Name कृपया नामांकित व्यक्ति का नाम दर्ज करें ", "", {
        positionClass: 'toast-top-right',
        progressBar: true,
      });
    } else if (this.form.value.nomDob == "" || this.form.value.nomDob == null) {
      this.toastrService.warning("Please Enter Nominee Dob कृपया नामांकित व्यक्ति की जन्मतिथि दर्ज करें ", "", {
        positionClass: 'toast-top-right',
        progressBar: true,
      });
    } else if (this.form.value.nomgender == "" || this.form.value.nomgender == null) {
      this.toastrService.warning("Please Enter Nominee Gender कृपया नामांकित व्यक्ति का लिंग दर्ज करें ", "", {
        positionClass: 'toast-top-right',
        progressBar: true,
      });
    } else if (this.form.value.nomirelation == "" || this.form.value.nomirelation == null) {
      this.toastrService.warning("Please Enter Nominee Relation कृपया नामांकित संबंध दर्ज करें ", "", {
        positionClass: 'toast-top-right',
        progressBar: true,
      });
    }
    // else if (this.form.value.minor == "" || this.form.value.minor == null) {
    //   this.toastrService.warning("Please Enter Nominee Minor", "", {
    //     positionClass: 'toast-top-right',
    //     progressBar: true,
    //   });
    // }

    else if (this.ageresult == 103 && (this.form.value.nomguardname == "" || this.form.value.nomguardname == null)) {
      this.form.controls["nomguardname"].setValidators([Validators.required]);
      this.form.controls['nomguardname'].updateValueAndValidity();

      this.toastrService.warning("Please Enter Nominee Guardian Name कृपया नामांकित अभिभावक का नाम दर्ज करें ", "", {
        positionClass: 'toast-top-right',
        progressBar: true,
      });
    }else if (this.ageresult == 103 && (this.form.value.nomguardage == "" || this.form.value.nomguardage == null)) {
      this.form.controls["nomguardage"].setValidators([Validators.required]);
      this.form.controls['nomguardage'].updateValueAndValidity();
      this.toastrService.warning("Please Enter Nominee Guardian Age  कृपया नामांकित अभिभावक आयु दर्ज करें ", "", {
        positionClass: 'toast-top-right',
        progressBar: true,
      });
    }else if (this.ageresult == 103 && (this.form.value.guardrelation == "" || this.form.value.guardrelation == null)) {
      this.form.controls["guardrelation"].setValidators([Validators.required]);
      this.form.controls['guardrelation'].updateValueAndValidity();
      this.toastrService.warning("Please Enter Nominee Guardian Relationship With Nominee कृपया नामांकित व्यक्ति के साथ नामांकित अभिभावक संबंध दर्ज करें ", "", {
        positionClass: 'toast-top-right',
        progressBar: true,
      });
    }else if (this.form.value.address == "" || this.form.value.address == null) {
      this.toastrService.warning("Please Enter Address कृपया पता दर्ज करें ", "", {
        positionClass: 'toast-top-right',
        progressBar: true,
      });
    } else if (this.form.value.pincode == "" || this.form.value.pincode == null) {
      this.toastrService.warning("Please Enter Pincode कृपया पिनकोड दर्ज करें ", "", {
        positionClass: 'toast-top-right',
        progressBar: true,
      });
    }

  }
  size = 24;
  dcoholder = 'Enter document number';
  adharvalid(doc) {
    console.log("work..", doc);

    if (doc === "1: Aadhar Card") {
      console.log("in adhar..");
      this.size = 12;
      this.dcoholder = "Enter " + doc.slice(3) + " number"
      this.form.controls["docnumber"].setValidators([Validators.required, Validators.pattern(/^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/)])
      this.form.controls['docnumber'].updateValueAndValidity();
    } else {
      this.form.controls["docnumber"].clearValidators();
      this.form.controls["docnumber"].updateValueAndValidity();
      this.dcoholder = "Enter " + doc.slice(3) + " number"
      this.size = 24;
      if (doc === "4: Others") {
        this.dcoholder = "Enter " + doc.slice(3) + " document" + " number"
      }
    }
  }

}

export class pinCodeLocations {

  pinCode: any;

  stateId: any;
  districtId: any;
  cityId: any;

  stateName: any;
  districtName: any;
  cityName: any;
  areas: areaModel[] = [];
}
export class areaModel {
  areaName: any;
  areaId: any;
}
export class project {



}



export class dobModel {
  dob: string;
}