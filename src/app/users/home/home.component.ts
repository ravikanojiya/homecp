import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
  MatSnackBar,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { DataserviceService } from 'src/app/dataservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  title = 'veritas-homeautomation';
  color = 'accent';
  checked = false;
  onoff = 'Off';
  formGroup: FormGroup;
  alldata = '';
  uid;
  userdata;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  uname;
  constructor(
    private ds: DataserviceService,
    public dialog: MatDialog,
    private rut: Router,
    private sb: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.uname = localStorage.getItem('uname');
    // this.ds.getData().then(res=>{
    //   this.alldata=res;
    // })
    this.formGroup = new FormGroup({
      acceptTerms: new FormControl('', Validators.requiredTrue),
    });
    this.uid = localStorage.getItem('uid');
    this.ds.getUser(this.uid).subscribe((res) => {
      this.userdata = res.data.results;
    });
  }
  myFunction() {
    var x = document.getElementById('myTopnav');
    if (x.className === 'topnav') {
      x.className += ' responsive';
    } else {
      x.className = 'topnav';
    }
  }
  // openDialog(): void {
  //   const dialogRef = this.dialog.open(LoginComponent, {
  //     width: '350px',
  //   });

  //   dialogRef.afterClosed().subscribe((result) => {
  //     if (result) {
  //       this.ds.getUser(this.uid).subscribe((res) => {
  //         this.userdata = res.data.results;
  //       });
  //     }
  //   });
  // }
  getLogin() {
    if (localStorage.getItem('islogin')) {
      return true;
    }
    return false;
  }
  logout() {
    localStorage.removeItem('islogin');
    localStorage.removeItem('uid');
    localStorage.removeItem('uname');
    localStorage.removeItem('loginid');

    this.rut.navigate(['']);
    this.sb.open('You are Logged Out...!', '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
