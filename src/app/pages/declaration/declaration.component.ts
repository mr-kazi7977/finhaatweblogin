import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { routes } from 'src/app/consts/routes';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-declaration',
  templateUrl: './declaration.component.html',
  styleUrls: ['./declaration.component.css']
})
export class DeclarationComponent implements OnInit {
  public routers: typeof routes = routes;
  pedrecord: any[] = [];
  orderForm: FormGroup;
  items: FormArray;

  form!: FormGroup;
  insureddata: any[] = [];
  insuredArr: FormArray;
  constructor(private router: Router, private toastrService: ToastrService, private auth: AuthService, private fb: FormBuilder, private formBuilder: FormBuilder) { }
  answer;
  proposalid;
  ngOnInit(): void {
    this.creatForm();
    this.proposalid = sessionStorage.getItem("proposalid");

    this.getped();
    
      //  alert(this.pedrecord[0]);
   

    // console.log("declaration controls" + this.declaration.controls.length)

    // this.insureddata =JSON.parse(sessionStorage.getItem('insured'))
    // alert(this.insureddata.length)


    // console.log("data", this.insureddata);

    //     this.insureddata.forEach((item, i) => {
    //       item = Object.assign(item, this.addDeclaration(i));
    // });
  }
  creatForm() {
    this.form = this.fb.group(
      {
        declaration: this.fb.array([])

      }
    );
  }
  savedata() {
    alert(JSON.stringify(this.form.value))
    this.peddata.insured_id = 125;
    this.peddata.proposal_id = 125;
    this.peddata.question_id = 1;
    this.peddata.answer = this.form.get('declaration')?.value
    // this.peddata.answer=this.form.value.declaration.value.answer;
    this.auth.post('coipeddata', this.peddata).subscribe(data => {
      // console.log("declaration_data" + data)
      // console.error("its error", data);

    })
  }
  // 1663677569849
  getinsuredByproposalid() {
    this.auth.getcityById('insuredbyproposal/' + this.proposalid).subscribe(data => {
      this.insureddata = data;
      // console.log("insured by proposal", data);
      //  alert(this.insureddata.length)
      //alert(data[0].insuredid)
      this.addDeclaration(this.insureddata);
    })
  }
  even(data) {
    alert(data)
    // console.log("shahrukh" + data)
  }


  declareFrom() {
    return this.fb.group(
      {
        question1_id: [''],
        question1_answer: [''],
        question2_id: [''],
        question2_answer: [''],
        question3_id: [''],
        question3_answer: [''],
        question4_id: [''],
        question4_answer: [''],
        insuredid:[''],
        proposalid:['']
        
        // diesesdetails:[''],
        // women:[''],
        // womendetails:[''],
        

      }
    );
  }
  trackbyfunction(index: any, item: any) {
    if (!item) {
      return null;
    }
    else {
      // this.addDeclaration();
      return index
    }
  }


  addDeclaration(data: any) {
    console.log("add :", data)
    // alert("add") proposalid
    var j = data.length;
    var i: number;
    for (i = 0; i < j; i++) {
      let dform: FormGroup = this.declareFrom();
      dform.patchValue({
        insuredid: data[i].insuredid,
        proposalid: data[i].proposalid,
        question1_id: this.pedrecord[0].id,
        question2_id: this.pedrecord[1].id,
        question3_id: this.pedrecord[2].id,
        question4_id: this.pedrecord[3].id,

      })
      this.declaration.push(dform);
      //alert("pushed")
    }
    // console.log("add completed")
  }

  get declaration(): FormArray {
    return this.form.get("declaration") as FormArray;
  }







  peddata: ped = new ped();



  name = [{
    name: ''
  },
  {
    name: ''
  }]
  panelOpenState;
  // onsubmit(){
  //   this.peddata.question_id=1
  //   this.peddata.answer=this.form.get('diesesdetails').value
  //   this.peddata.insured_id=this.form.get('womendetails').value
  //   this.peddata.proposal_id=245
  //   console.log(this.peddata.answer);
  //   this.auth.post('coipeddata',this.peddata).subscribe(data=>{
  //     console.log(data)
  //   })
  // }

  hide = 0;
  hide2 = 0;



  show(data: any) {
    // alert(JSON.stringify(data))    
    this.hide = data + 1
  }
  show2(d: any) {
    // this.hide2=!this.hide2
    this.hide2 = d + 1;

  }




  save() {

    this.peddata=this.form.value.declaration

    
    this.auth.post('coipeddata', this.peddata).subscribe(data => {
      // console.log(data)
      // console.log(data.errorCode)
      if(data && data.errorCode==100){
        this.toastrService.success(data.errorMessage, 'Message');
        this.router.navigate([this.routers.DETAILS]).then();
      }else{
        this.toastrService.error(data.errorMessage, 'Message');
      }
     
    })

  }

  getped() {
    this.auth.get("peddetails").subscribe(data => {
      // console.log("ped quation" ,data);
      this.pedrecord = data;
      this.getinsuredByproposalid();
    });
  }

}
export class ped {
  proposal_id: number;
  insured_id: number;
  question_id: number;
  answer: string;
}




