import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppartmentsComponent } from './components/appartments/appartments.component';
import { OfficesComponent } from './components/offices/offices.component';
import { DataserviceService } from './dataservice.service';
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
  alldata='';
  constructor(private ds:DataserviceService,public dialog: MatDialog,){}
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
      acceptTerms : new FormControl('', Validators.requiredTrue),
    });
  }
  onFormSubmit() {

  }
}

