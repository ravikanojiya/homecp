import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DataserviceService } from 'src/app/dataservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  test=new Date();
  loginform: FormGroup;
  user;
  erroruser: Boolean = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(
    private ds: DataserviceService,
    private rut: Router,
    private sb: MatSnackBar
  ) {}

  ngOnInit(): void {

    this.loginform = new FormGroup({
      loginid: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    if(this.loginform.valid){

    this.ds.getUserlogin(this.loginform.value).subscribe((res) => {


      if (res.status == true) {
        this.sb.open('Login Successfully...!', '', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        localStorage.setItem('islogin', 'true');
        localStorage.setItem('uid', res.data[0].id);
        localStorage.setItem('uname',res.data[0].fname +" "+ res.data[0].lname);
        localStorage.setItem('loginid',res.data[0].loginid);
        console.log(localStorage.getItem('uname'));
        this.rut.navigate(['../users']);

      } else {
        this.erroruser = true;
        this.rut.navigate(['']);
        this.loginform.get('loginid').setValue('');
        this.loginform.get('password').setValue('');
        this.sb.open('Wrong Username & Password...!', '', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }
    });
  }
  }
  getLogin() {
    if (localStorage.getItem('islogin')) {
      return true;
    }
    return false;
  }

}
