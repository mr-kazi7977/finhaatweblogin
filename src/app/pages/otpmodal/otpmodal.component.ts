import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-otpmodal',
  templateUrl: './otpmodal.component.html',
  styleUrls: ['./otpmodal.component.css']
})

export class OtpmodalComponent implements OnInit {

  proposalid:string;
  constructor(
    public dialogRef: MatDialogRef<OtpmodalComponent>,
    @Optional()@Inject(MAT_DIALOG_DATA) public data:any,
    private auth: AuthService
    
  ) {
    this.user.username=data;
  }
  ngOnInit(): void {
    
  }
  public user:userAuthModel = new userAuthModel();
otp="shahrukh"
  verify() {
    this.user.username=this.data.username;
    this.user.username=this.data;
    // console.log(this.user);
    
    this.auth.post("payment/verifyotp",this.user).subscribe(data=>{
      if(data==100){
        this.dialogRef.close("100");
      }
      else{
        this.dialogRef.close("Please Enter Valid Otp");
      }
      
    })
  

     
  }
  closebtn(){
    this.dialogRef.close("Please Enter Otp");
  }

}

export class userAuthModel {
  otp:string;
  username:string;
  
}