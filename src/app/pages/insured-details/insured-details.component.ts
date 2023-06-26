import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common'
import { AuthService } from 'src/app/service/auth.service';
import { nomineerelationships, relationships } from '../details/details.component';

@Component({
  selector: 'app-insured-details',
  templateUrl: './insured-details.component.html',
  styleUrls: ['./insured-details.component.css']
})
export class InsuredDetailsComponent implements OnInit {

  firstName:[];
  constructor( private auth: AuthService,public datepipe: DatePipe,@Inject(MAT_DIALOG_DATA) public data) {
  //  console.log("Data",data[0].proposalid);
   
   }

   relationshipMap: Map<string, string> = new Map<string, string>();
  nomineeRelationshipMap: Map<string, string> = new Map<string, string>();


   renewData=new FormGroup({
    proposalid:new FormControl(''),
    insuredname:new FormControl(''),
    insureddob:new FormControl(''),
    insuredage:new FormControl(''),
    insuredgender:new FormControl(''),
    height:new FormControl(''),
    weight:new FormControl(''),
    createdat:new FormControl(''),
    certificateNumber:new FormControl(''),
    insuredrelationfromprimary:new FormControl(''),
    nomineename:new FormControl(''),
    nomineerelationwithinsured:new FormControl(''),
    startdate:new FormControl(''),
    enddate:new FormControl(''),
    memberemail:new FormControl(''),
    address:new FormControl(''),
    city:new FormControl(''),
    pincode:new FormControl(''),
  })



  ngOnInit(): void {

    // this.insuredData();
    this.getNomRelation();
    this.getRelationship();
  
  }

  getNomRelation(): void {
    this.auth.get("nomrelation").subscribe(data => {
      //console.log("nomrelation--" + JSON.stringify(data));
      let nmr: nomineerelationships[] = [];
      nmr = data;
      for (let index = 0; index <= nmr.length - 1; index++) {
        this.nomineeRelationshipMap.set(nmr[index].nominee_rcode, nmr[index].nominee_rname);
      }
    })
  }

  getRelationship(): void {
    this.auth.get("getrelationship").subscribe(data => {
      // console.log("nomrelation--" + JSON.stringify(data));
      let nmr: relationships[] = [];
      nmr = data;
      for (let index = 0; index <= nmr.length - 1; index++) {
        this.relationshipMap.set(nmr[index].rcode, nmr[index].rname);


      }
    })
  }

  insuredData(){
    let insureddob =this.datepipe.transform(this.data.coiInsured[0].insureddob, 'yyyy-MM-dd');
    let createdat =this.datepipe.transform(this.data.coiInsured[0].createdat, 'yyyy-MM-dd');
   {{this.data.coiInsured[0].insureddob}}
   {{this.data.coiInsured[0].createdat}}
    
    this.renewData.patchValue({
      // months:this.data.month,
      proposalid:this.data.coiInsured[0].proposalid,
      insuredname:this.data.coiInsured[0].insuredname,
      insureddob:insureddob,
      insuredage:this.data.coiInsured[0].insuredage,
      insuredgender:this.data.coiInsured[0].insuredgender,
      height:this.data.coiInsured[0].height,
      weight:this.data.coiInsured[0].weight,
      createdat:createdat,
      certificateNumber:this.data.coiInsured[0].certificateNumber,
      insuredrelationfromprimary:this.data.coiInsured[0].insuredrelationfromprimary,
      nomineename:this.data.coiInsured[0].nomineename,
      nomineerelationwithinsured:this.data.coiInsured[0].nomineerelationwithinsured,
      startdate:this.data.startdate,
      enddate:this.data.enddate,
      memberemail:this.data.memberemail,
      address:this.data.address,
      city:this.data.city, 
      pincode:this.data.pincode
    })
  }

}