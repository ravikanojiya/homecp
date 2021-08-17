import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataserviceService } from 'src/app/dataservice.service';
import { LivingInt } from './living-int';
import 'round-slider';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-livingarea',
  templateUrl: './livingarea.component.html',
  styleUrls: ['./livingarea.component.css'],
})
export class LivingareaComponent implements OnInit {
  getdevices;
  checked;
  formGroup: FormGroup;
  id: number = 1;
  fanstatus;
  isLoading = true;
  roomid;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(
    public dialogRef: MatDialogRef<LivingareaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: LivingInt,

  ) {}

  ngOnInit(): void {

  }
  openSnackBar() {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
