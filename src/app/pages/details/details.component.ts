import * as moment from 'moment';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { routes } from 'src/app/consts/routes';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { Console } from 'console';
import { environment } from 'src/environments/environment';
import { IfStmt } from '@angular/compiler';
import { MatDialog } from '@angular/material/dialog';
import { OtpmodalComponent } from '../otpmodal/otpmodal.component';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})

export class DetailsComponent implements OnInit {

  validateForm: any;
  data: any = [];
  panelOpenState = false;
  public routers: typeof routes = routes;
  insudata: any;
  back1: any = [];
  proposalid: any;
  proposalData:any;
  relationshipMap: Map<string, string> = new Map<string, string>();
  nomineeRelationshipMap: Map<string, string> = new Map<string, string>();

  constructor(public dialog: MatDialog, private router1: Router, private matExpansionModule: MatExpansionModule, private matTableModule: MatTableModule, private router: Router, private fb: FormBuilder,
    private auth: AuthService, private toastrService: ToastrService, private tokenStorage: TokenStorageService) { }

  back() {
    this.router1.navigate([this.routers.CDOT]).then();

  }
  premium: premiumDetail = new premiumDetail();

  // 1661742887552
  getpremiumdetails() {
    // console.log("Premium for proposal ID:" + this.proposalid);
    this.auth.get('getPremiumDetails/' + this.proposalid).subscribe((resp) => {

      // console.log("premium", resp);
      

      this.premium = resp;


      // console.log("Premium Details:" + JSON.stringify(this.premium))
    });
  }

  data2: any
  insuredetails:[];
  getdetails() {
    this.auth.get('coilist/' + this.proposalid).subscribe((resp)=>{
      this.insudata=resp;
      this.insuredetails=this.insudata.coiInsured;
      // console.log("coidataa.",this.insudata)
      // console.log("insudata.",this.insudata.coiInsured[0].nomineedob)
      

    })
   // this.data = this.tokenStorage.get("coidata");
    this.proposalid = this.tokenStorage.get("proposalid");
  }

  ngOnInit(): void {
    // this.data = JSON.parse(this.tokenStorage.get("coidata"));
    // this.data2 = this.data;
    // console.log("no of insured:" + this.data.occupation)
    //this.proposalid = this.tokenStorage.get("proposalid");
    
    this.proposalid = this.tokenStorage.get("proposalid");
    // console.log("id from policydetail",this.proposalid);
    
    this.getpremiumdetails();
    this.getdetails();
  
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
      //console.log("nomrelation--" + JSON.stringify(data));
      let nmr: relationships[] = [];
      nmr = data;
      for (let index = 0; index <= nmr.length - 1; index++) {
        this.relationshipMap.set(nmr[index].rcode, nmr[index].rname);


      }
    })
  }



  public birthdate: Date;
  public age: number;


  adddate() {


  }



  otp: any
  otpverify: otpsend = new otpsend();
  verify() {
    this.otpverify.proposalId = this.proposalid;
    this.otpverify.otpfetch = this.otp;
    if (this.otp != "" && this.otp != null) {
      // alert(this.proposalid)
      this.auth.post("payment/verifyotp" + this.otpverify, "").subscribe((data) => {
        if (data && data == 100) {
          // this.paypage();

        } else {
          this.toastrService.error("issue in payment process..")
        }
      })
    }
  }
  otpvalidated: boolean = true;

  payment() {

    this.auth.post('payment/otpsend/' + this.proposalid, "").subscribe((data) => {
      // console.log("data", data);

      if (data == 100) {
        this.toastrService.success("OTP Send Successfully...")
        const dialogRef = this.dialog.open(OtpmodalComponent, {
          data: this.proposalid,
          disableClose: true,
          height: '30%',
          width: '80vw',

        });

        dialogRef.afterClosed().subscribe(result => {
          // console.log(`Dialog result: ${result}`);
          if (result == "100") {
            this.toastrService.success("OTP Verify")
            this.paypage();
          }
          else {
            this.toastrService.error(result)
          }
        });
      }

      else {
        this.toastrService.error("Failed OTP Send..")
      }
    })


    //   this.auth.post('getpg/'+this.proposalid,"").subscribe((data)=>{
    //     let resp:any=data;
    //     if(this.otpvalidated){

    //       let f=document.createElement("form");
    //       f.setAttribute("method","POST");



    //       if(resp.insurer=='ABHI'){
    //         f.setAttribute("action",resp.pgUrl);

    //       let i =document.createElement("input");
    //       i.type="hidden";
    //       i.name="SourceCode";
    //       i.value=resp.source;
    //       f.appendChild(i);

    //        i =document.createElement("input");
    //       i.type="hidden";
    //       i.name="PhoneNo";
    //       i.value=resp.phoneNo;
    //       f.appendChild(i);

    //        i =document.createElement("input");
    //       i.type="hidden";
    //       i.name="Email";
    //       i.value=resp.email;
    //       f.appendChild(i);


    //        i =document.createElement("input");
    //       i.type="hidden";
    //       i.name="OrderAmount";
    //       i.value=resp.amount;
    //       f.appendChild(i);

    //       i =document.createElement("input");
    //       i.type="hidden";
    //       i.name="Currency";
    //       i.value="INR";
    //       f.appendChild(i);

    //       i =document.createElement("input");
    //       i.type="hidden";
    //       i.name="secSignature";
    //       i.value=resp.signature;
    //       f.appendChild(i);

    //       i =document.createElement("input");
    //       i.type="hidden";
    //       i.name="ReturnURL";
    //       i.value=resp.returnUrl;
    //       f.appendChild(i);

    //       i =document.createElement("input");
    //       i.type="hidden";
    //       i.name="QuoteId";
    //       i.value=resp.quote;
    //       f.appendChild(i);

    //       i =document.createElement("input");
    //       i.type="hidden";
    //       i.name="SubCode";
    //       i.value=" ";
    //       f.appendChild(i);

    //       i =document.createElement("input");
    //       i.type="hidden";
    //       i.name="GrossPremium";
    //       i.value=resp.amount;
    //       f.appendChild(i);

    //       i =document.createElement("input");
    //       i.type="hidden";
    //       i.name="FinalPremium";
    //       i.value=resp.amount;
    //       f.appendChild(i);

    //       i =document.createElement("input");
    //       i.type="hidden";
    //       i.name="SourceTxnId";
    //       i.value=this.proposalid;
    //       f.appendChild(i);

    //       i =document.createElement("input");
    //       i.type="hidden";
    //       i.name="productinfo";
    //       i.value=resp.productInfo;
    //       f.appendChild(i);
    //     }else if(resp.insurer=="SBIH"){
    //       f.setAttribute("action",resp.pgUrl+this.proposalid);
    //     }
    //     document.body.appendChild(f);
    //     f.submit();
    // }


    //     });




    // this.auth.get('payment/'+this.proposalid).subscribe((data)=>{
    //   console.log("payment confirmation:"+JSON.stringify(data))
    //   if (data && data.errorCode == 100) {
    //     this.router1.navigate([this.routers.PAYMENT]).then();
    //   }
    //   });


  }

  paypage() {
    this.auth.post('getpg/' + this.proposalid, "").subscribe((data) => {
      let resp: any = data;
      if (this.otpvalidated) {

        let f = document.createElement("form");
        f.setAttribute("method", "POST");



        if (resp.insurer == 'ABHI') {
          f.setAttribute("action", resp.pgUrl);

          let i = document.createElement("input");
          i.type = "hidden";
          i.name = "SourceCode";
          i.value = resp.source;
          f.appendChild(i);

          i = document.createElement("input");
          i.type = "hidden";
          i.name = "PhoneNo";
          i.value = resp.phoneNo;
          f.appendChild(i);

          i = document.createElement("input");
          i.type = "hidden";
          i.name = "Email";
          i.value = resp.email;
          f.appendChild(i);


          i = document.createElement("input");
          i.type = "hidden";
          i.name = "OrderAmount";
          i.value = resp.amount;
          f.appendChild(i);

          i = document.createElement("input");
          i.type = "hidden";
          i.name = "Currency";
          i.value = "INR";
          f.appendChild(i);

          i = document.createElement("input");
          i.type = "hidden";
          i.name = "secSignature";
          i.value = resp.signature;
          f.appendChild(i);

          i = document.createElement("input");
          i.type = "hidden";
          i.name = "ReturnURL";
          i.value = resp.returnUrl;
          f.appendChild(i);

          i = document.createElement("input");
          i.type = "hidden";
          i.name = "QuoteId";
          i.value = resp.quote;
          f.appendChild(i);

          i = document.createElement("input");
          i.type = "hidden";
          i.name = "SubCode";
          i.value = " ";
          f.appendChild(i);

          i = document.createElement("input");
          i.type = "hidden";
          i.name = "GrossPremium";
          i.value = resp.amount;
          f.appendChild(i);

          i = document.createElement("input");
          i.type = "hidden";
          i.name = "FinalPremium";
          i.value = resp.amount;
          f.appendChild(i);

          i = document.createElement("input");
          i.type = "hidden";
          i.name = "SourceTxnId";
          i.value = this.proposalid;
          f.appendChild(i);

          i = document.createElement("input");
          i.type = "hidden";
          i.name = "productinfo";
          i.value = resp.productInfo;
          f.appendChild(i);
        } else if (resp.insurer == "SBIH") {
          f.setAttribute("action", resp.pgUrl + this.proposalid);
        }
        document.body.appendChild(f);
        f.submit();
      }


    });
  }


}
export class relationships {
  rcode: string;
  rname: string;
}
export class nomineerelationships {
  nominee_rcode: string;
  nominee_rname: string;
}

export class premiumDetail {
  basepremium: number;
  dateCreated: string;
  grosspremium: number;
  gst: number;
  id: number;
  ifscCode: string;
  instrumentDate: string;
  instrumentNumber: string;
  lastUpdated: string;
  netpremium: number;
  paymentGatewayName: string;
  quotationNo: string;
  requestid: number;
  sourceTxnId: number;
  status: string;
  terminalId: string
}
export class otpsend {
  proposalId: string;
  otpfetch: number;

}



