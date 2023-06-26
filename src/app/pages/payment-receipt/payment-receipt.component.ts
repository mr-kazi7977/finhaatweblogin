import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';


@Component({
  selector: 'app-payment-receipt',
  templateUrl: './payment-receipt.component.html',
  styleUrls: ['./payment-receipt.component.css']
})
export class PaymentReceiptComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
    // console.log(this.data.payrefno);
    this.preciept = this.data;
    this.openPDF();
  }

  preciept: any;

  @ViewChild('pdfTable')
  pdfTable!: ElementRef;
  public openPDF() {
    // let DATA: any = document.getElementById('pdfTable');
    // html2canvas(DATA).then((canvas: any) => {
    //   let fileWidth = 208;
    //   let fileHeight = (canvas.height * fileWidth) / canvas.width;
    //   const FILEURI = canvas.toDataURL('image/png');
    //   let PDF = new jsPDF('p', 'mm', 'a4');
    //   let position = 0;
    //   PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
    //   PDF.save('Payreciept.pdf');


    // });
  }
}
