import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from 'src/app/consts/routes';
import { AuthService } from 'src/app/service/auth.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  public routers: typeof routes = routes;
  payreceipt: any = [];
  constructor(private router1: Router, private auth: AuthService, private toastrService: ToastrService, private tokenStorage: TokenStorageService, private paramroute: ActivatedRoute) { }
  proposalid: any;
  policy: any;

  // paymentres = true;
  getpayreceipt() {

    // console.log("proposalID:"+this.proposalid)
    // if(this.proposalid=='0' || this.proposalid==null || this.proposalid==undefined || this.proposalid=="null"){
    //   return this.paymentres=false
    // }else{
    this.auth.get('getpayreceipt/' + this.proposalid).subscribe((resp) => {
      this.payreceipt = resp;
      // console.log("pay.." + JSON.stringify(resp))
    })
    //   return this.paymentres=true

    // }


  }
  ngOnInit(): void {
    this.paramroute.queryParams
      .subscribe(params => {
        console.log(JSON.stringify(params)); // { orderby: "price" }
        this.proposalid = params.proposalid;
        this.policy = params.policy;
        // console.log(this.proposalid); // price
        // console.log("policy", this.policy);

      }
      );

    //this.proposalid=this.tokenStorage.get("proposalid");
    this.getpayreceipt()
  }

  download(): void {
    const downloaUrl = "download/abhicovernote";
    const downloaUrl1 = `${environment.AUTH_API + downloaUrl}/${this.proposalid}`;
    window.open(downloaUrl1, '_blank');

  }
  generatePolicy(): void {
    this.auth.post('generatePolicy/' + this.proposalid, "").subscribe((data) => {
      if (data && data.errorCode == 100) {

        this.getpayreceipt();
      }
      else
        alert("unable to generate policy now.. try after some time..")
      //  this.toastrService.error("unable to generate policy now.. try after some time..");

    })
  }
}
