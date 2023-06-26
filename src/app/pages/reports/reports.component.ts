import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment';
import { user } from '../policyDetail/policydetail/policydetail.component';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  insudata: any;

  constructor(private auth: AuthService, private toastrService: ToastrService, public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.findExceldata();
    this.auth.getpartnerdata().subscribe((res: any) => {
      console.log("response::", res);
      this.scode = res[0].productcode;
      this.insudata = res;
      //this.filterprod(res.productcode, true, 'company')

    })
  }

  // filterprod(id: any, arg1: boolean, arg2: string) {
  //   throw new Error('Method not implemented.');
  // }
  maxdate=new Date();
  StartDate: any;
  EndDate: any;
  scode:any;
  selectPartner:any;
  startend: Exceldate = new Exceldate();

  getExcel() {
    let check = false;
    if (this.StartDate == null || this.StartDate == undefined) {
      this.toastrService.error("Please Enter Start Date")
      return check = true;
    }
    else if (this.scode == null || this.scode == undefined) {
      this.toastrService.error("Please Select Product")
      return check = true;
    }



    let startdate = this.datepipe.transform(this.StartDate, 'yyyy-MM-dd');
    let enddate = this.datepipe.transform(this.EndDate, 'yyyy-MM-dd');
    console.log("scode"+this.scode);

    this.auth.Excelldata('excel/Excelshow',startdate,this.scode).subscribe((res: any) => {
      // console.log("response", res);

      this.dataSource = new MatTableDataSource<user>(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      // console.log("Excell data", this.dataSource)
    })

    const downloaUrl = "excel/ghcExport";
    const downloaUrl1 = `${environment.AUTH_API + downloaUrl}/${startdate}/${this.scode}`;
    window.open(downloaUrl1, '_blank');







    // console.log("Start" + this.StartDate, "End" + this.EndDate);

  }

  getGpaExcel() {
    let check = false;
    if (this.StartDate == null || this.StartDate == undefined) {
      this.toastrService.error("Please Enter Start Date")
      return check = true;
    }
    else if  (this.scode == null || this.scode == undefined) {
      this.toastrService.error("Please Select Product")
      return check = true;
    }
    console.log("product"+this.scode);



    let startdate = this.datepipe.transform(this.StartDate, 'yyyy-MM-dd');
    let enddate = this.datepipe.transform(this.EndDate, 'yyyy-MM-dd');

    this.auth.Excelldata('excel/Excelshow',startdate,this.scode).subscribe((res: any) => {
      // console.log("response", res);

      this.dataSource = new MatTableDataSource<user>(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      // console.log("Excell data", this.dataSource)
    })

    const downloaUrl = "excel/gpaExport";
    const downloaUrl1 = `${environment.AUTH_API + downloaUrl}/${startdate}/${this.scode}`;
    window.open(downloaUrl1, '_blank');







    // console.log("Start" + this.StartDate, "End" + this.EndDate);

  }

  searchExcel() {
    let check = false;
    if (this.StartDate == null || this.StartDate == undefined) {
      this.toastrService.error("Please Enter Start Date")
      return check = true;
    }
    else if (this.scode == null || this.scode == undefined) {
      this.toastrService.error("Please Select Product")
      return check = true;
    }
    console.log("product"+this.scode);
    let startdate = this.datepipe.transform(this.StartDate, 'yyyy-MM-dd');
    //let enddate = this.datepipe.transform(this.EndDate, 'yyyy-MM-dd');

    this.auth.Excelldata('excel/Excelshow',startdate,this.scode).subscribe((res: any) => {
      // console.log("response", res);

      this.dataSource = new MatTableDataSource<user>(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      // console.log("Excell data", this.dataSource)
    })
  }
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  displayedColumns: string[] = ['Name', 'Gender', 'DOB', 'Mobile', 'Email', 'location', 'nominee_NAME', 'nominee_AGE','createdat'];
  dataSource = new MatTableDataSource<user>();

  employeeInfoTable: user[];
  name: any
  num: any = 192
  findExceldata() {
    // this.auth.getExcelldata().subscribe((res: any) => {
    //   console.log("response", res);

    //   this.dataSource = new MatTableDataSource<user>(res);
    //   this.dataSource.paginator = this.paginator;
    //   this.dataSource.sort = this.sort;
    //   console.log("Excell data", this.dataSource)
    // })
  }

}
export class Exceldate {
  startDate: any
  endDate: any
}
