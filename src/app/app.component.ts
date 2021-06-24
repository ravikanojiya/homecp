import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AppartmentsComponent } from './components/appartments/appartments.component';
import { OfficesComponent } from './components/offices/offices.component';
import { DataserviceService } from './dataservice.service';
import { LoginComponent } from './login/login.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
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
  constructor(
    private ds: DataserviceService,
    public dialog: MatDialog,
    private rut: Router,
    private sb: MatSnackBar
  ) {}
  // openDialog() {
  //   const dialogRef = this.dialog.open(AppartmentsComponent);

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(`Dialog result: ${result}`);
  //   });
  // }
  // openDialogOffice() {
  //   const dialogRef = this.dialog.open(OfficesComponent);

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(`Dialog result: ${result}`);
  //   });
  // }
  ngOnInit(): void {
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
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '350px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.ds.getUser(this.uid).subscribe((res) => {
          this.userdata = res.data.results;
        });
      }
    });
  }
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
    console.log(localStorage.getItem('uname'));

    this.rut.navigate(['']);
    this.sb.open('You are Logged Out...!', '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
