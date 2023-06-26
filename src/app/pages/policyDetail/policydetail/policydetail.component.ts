import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment';
import { InsuredDetailsComponent } from '../../insured-details/insured-details.component';
import { PaymentReceiptComponent } from '../../payment-receipt/payment-receipt.component';
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';
import { Router } from '@angular/router';
import { routes } from 'src/app/consts/routes';

interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-policydetail',
  templateUrl: './policydetail.component.html',
  styleUrls: ['./policydetail.component.css']
})
export class PolicydetailComponent implements OnInit {
  // selectpro: Object;
  selected='All';
  public routers: typeof routes = routes;
  userdata: any;
  
  constructor(private router: Router, private auth: AuthService, private toastrService: ToastrService, public dialog: MatDialog, public datepipe: DatePipe) { }

  openDialog(tdata: any) {
    // console.log("tdata", tdata);

    const dialogRef = this.dialog.open(InsuredDetailsComponent, {

      data: tdata



    });
    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed' + result);

    });

  }


  ngOnInit(): void {
   // this.loginuser=localStorage.getItem("logtype")
    //this.findinsured();
    this.getRelationship();
    this.getproduct();
    this.auth.getpartner().subscribe((res: any) => {
      // console.log("response", res);
      this.scode = res[0].id;
      this.insudata = res;
      this.filterprod(res[0].id, true, 'company')

    })
  }
  maxdate=new Date();
  fildata: filterreqdata = new filterreqdata()
  filterreq() {
    // console.log("productcode", this.fildata.productcode);
    //console.log("fildataModel", this.fildata);
    let check = false;
    if (this.fildata.productcode == null || this.fildata.productcode == undefined) {
      this.toastrService.error('   Please Enter Product')
      return check = true;
    }
    if (this.fildata.serdate == null || this.fildata.serdate == undefined) {
      this.toastrService.error('   Please Enter Date')
      return check = true;
    }
    

    this.auth.getfilinsured(this.fildata).subscribe((res: any) => {
      // console.log("response", {res});
      // this.insudata = res;
      this.dataSource = new MatTableDataSource<user>(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      // console.log(this.dataSource)
    })
  }

 
getUser(){
//console.log(this.fildata.companyid);

  this.auth.getuserList(this.fildata.companyid).subscribe((res: any) => {
//console.log("userdata",res)
    this.userdata = res;
    

  })
}



  // @ViewChild('pdfTable')
  // pdfTable!: ElementRef;

loginuser:any;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  displayedColumns: string[] = ['name', 'DOB', 'mobile', 'relation', 'createdat', 'Receipt', 'Download','ghc','gpa', 'insured', 'pay','concent','edit'];
  dataSource = new MatTableDataSource<user>();
  relationshipMap: Map<string, string> = new Map<string, string>();
  applyfilter(filtervalue: string) {
    this.dataSource.filter = filtervalue.trim().toLowerCase();
  }


  employeeInfoTable: user[];
  name: any
  usertype: any;
  insudata: any;
  SelectedDate: any;
  selectPartner: any;
  pcode;


  // findinsured() {
  //   this.usertype = localStorage.getItem("logtype");
    

  // }

  
  valueChanged(dateRangeStart: any) {
    // this.SelectedDate=new Date();
    // console.log(dateRangeStart);

    this.fildata.serdate = this.datepipe.transform(dateRangeStart, 'yyyy-MM-dd');
    // console.log("currentdate", start_date);
    // this.dataSource.filter = start_date.trim().toLowerCase();

  }


  scode: any;
  
  result(){
    this.fildata.userid=null;
   
  }
  filterprod(slecteddata: any, event: any, type: any) {
    //console.log("slecteddata",slecteddata);
    
    if (event.isUserInput == true || event == true) {


      if (type.toLowerCase() == 'product') {
        this.fildata.productcode = slecteddata;
      }
      if (type.toLowerCase() == 'userid') {
        this.fildata.userid = slecteddata;
      }
      if (type.toLowerCase() == 'company') {
        this.fildata.companyid = slecteddata;
        this.auth.getproductbycompany(this.fildata.companyid).subscribe((res) => {
          // console.log("welcome to log", res);
          this.selectpro = res
          this.pcode = res[0].productcode;
          this.fildata.productcode = res[0].productcode

        })
        this.getUser();
      }

    }
  }

  download(proposalId: any): void {
    // this.auth.get('download/abhicovernote/'+proposalId).subscribe(data=>{
    //   console.log("download cover note called");
    // });
    const downloaUrl = "download/abhicovernote";
    const downloaUrl1 = `${environment.AUTH_API + downloaUrl}/${proposalId}`;
    window.open(downloaUrl1, '_blank');
  }

 ghcdoc(proposalId: any){
    const downloaUrl = "ghcpdoc";
    // 1669888013387
    const downloaUrl1 = `${environment.AUTH_API + downloaUrl}/${proposalId}`;
    window.open(downloaUrl1, '_blank');
  }
  gpadoc(proposalId: any){
    const downloaUrl = "gpadoc";
    // 1669888013387
    const downloaUrl1 = `${environment.AUTH_API + downloaUrl}/${proposalId}`;
    window.open(downloaUrl1, '_blank');
  }
  x=false;
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

  payreceipt: any;
  receipt(proposal: any) {
    this.auth.get('getpayreceipt/' + proposal).subscribe((resp) => {
      this.payreceipt = resp;
      if (resp != null) {
        const downloaUrl = "download/payreciep";
        const downloaUrl1 = `${environment.AUTH_API + downloaUrl}/${proposal}`
        // console.log(downloaUrl1);
        window.open(downloaUrl1, '_blank');
      }
      else {
        this.toastrService.error('Payment not done yet');
      }
    })
  }
  proposalid: any;
  premium: premiumDetail = new premiumDetail();




  paylink(proposalid: any) {
    sessionStorage.setItem("proposalid", proposalid)
    //  this.auth.get('getPremiumDetails/' + proposalid).subscribe((resp) => {

    //   this.premium = resp;
    //   console.log("premium", this.premium);

    this.router.navigate([this.routers.DETAILS]).then();
    // })



  }

  productdata:any
getproduct() {
  return this.auth.getproduct().subscribe((res) => {
    // console.log("side bar to log", res);
    this.productdata=res;
  });
}

editform(id:any){
//localStorage.setItem("id", id)
this.router.navigate([this.routers.EDIT,id]).then();

}



  selectpro: any;
  selectProduct: any;


}


export interface user {
  proposalid: any;
  insuredname: string;
  insuredage: string;
  nomineedob: string;
  insuredmobile: string;
  insuredrelationfromprimary: string;
  nomineename: string;
  nomineeage: string;
  nomineerelationwithinsured: string;
  certificateNumber: any;
}

export class relationships {
  rcode: string;
  rname: string;
}

export class filterreqdata {
  productcode: any;
  serdate: any;
  companyid: any;
  userid:any
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

