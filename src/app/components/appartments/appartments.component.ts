import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DataserviceService } from 'src/app/dataservice.service';
import { LivingInt } from '../livingarea/living-int';
import { LivingareaComponent } from '../livingarea/livingarea.component';

@Component({
  selector: 'app-appartments',
  templateUrl: './appartments.component.html',
  styleUrls: ['./appartments.component.css'],
})
export class AppartmentsComponent implements OnInit {
  color = 'accent';
  checked = false;
  onoff = 'Off';
  formGroup: FormGroup;
  livingdata;
  getallrooms;
  roomsid;
  // constructor(public fb:FormBuilder,public dialogRef: MatDialogRef<AppartmentsComponent>,
  //   public dialog: MatDialog,  @Inject(MAT_DIALOG_DATA) public data: {name: string}) { }
  constructor(
    private ds: DataserviceService,
    private activroutes: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.roomsid = this.activroutes.snapshot.params.id;
    console.log(this.roomsid);

    this.ds.getrooms().then((res) => {
      this.getallrooms = res;
    });
    // this.formGroup = this.fb.group({
    //   acceptTerms : false
    // });
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(LivingareaComponent, {
      width: '650px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }
  // onNoClick(): void {
  //   this.dialogRef.close();
  // }
}
