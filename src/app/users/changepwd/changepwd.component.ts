import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DataserviceService } from 'src/app/dataservice.service';

@Component({
  selector: 'app-changepwd',
  templateUrl: './changepwd.component.html',
  styleUrls: ['./changepwd.component.css']
})
export class ChangepwdComponent implements OnInit {
  test: Date = new Date();
  chngpwdForm: FormGroup;
  adminUser;
  loginid;
  horizontalPosition: MatSnackBarHorizontalPosition = "center";
  verticalPosition: MatSnackBarVerticalPosition = "top";
  pwdMsg;
  constructor(
    private ds: DataserviceService,
    private sb: MatSnackBar,
    private rut: Router
  ) {}

  ngOnInit(): void {
    this.loginid = localStorage.getItem("uid");
    this.chngpwdForm = new FormGroup({
      id: new FormControl(this.loginid),
      new_password: new FormControl("", Validators.required),
      old_password: new FormControl("", Validators.required),
    });
  }
  checkpwd() {
    var cnf = (document.getElementById("cnfpwd") as HTMLInputElement).value;
    if (this.chngpwdForm.value.new_password == cnf) {
      this.pwdMsg = ""


    } else {
      this.pwdMsg = "Confirm Password not matched...!";

    }
  }
  chgpwd() {
    var cnf = (document.getElementById("cnfpwd") as HTMLInputElement).value;
    if (this.chngpwdForm.value.new_password == cnf) {
      this.pwdMsg = ""

    } else {
      this.pwdMsg = "Confirm Password not matched...!";
    }
    if (
      this.chngpwdForm.value.new_password == this.chngpwdForm.value.old_password
    ) {
      this.sb.open("New Password is already used...!", "", {
        panelClass: ["red-snackbar"],
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 2500,
      });
    } else {
      this.ds.changeUserPwd(this.chngpwdForm.value).subscribe((res) => {

        if (res.success == 1) {
          localStorage.removeItem("islogin");
          localStorage.removeItem("uid");
          localStorage.removeItem("name");
          localStorage.removeItem("loginid");
          this.sb.open("Password Changed successfully...!", "", {
            panelClass: ["green-snackbar"],
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 2500,
          });
          this.rut.navigate(["../"]);
        } else {
          this.sb.open("Please Check Old Password...!", "", {
            panelClass: ["red-snackbar"],
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 2500,
          });
          this.rut.navigate(["./changepwd"]);
          this.chngpwdForm.get("new_password").setValue("");
          this.chngpwdForm.get("old_password").setValue("");
        }
      });
    }
  }

}
