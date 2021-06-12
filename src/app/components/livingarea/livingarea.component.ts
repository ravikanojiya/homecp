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
@Component({
  selector: 'app-livingarea',
  templateUrl: './livingarea.component.html',
  styleUrls: ['./livingarea.component.css'],
})
export class LivingareaComponent implements OnInit, AfterViewInit {
  getdevices;
  checked;
  formGroup: FormGroup;
  id: number = 1;
  fanstatus;
  isLoading = true;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(
    public dialogRef: MatDialogRef<LivingareaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: LivingInt,
    private ds: DataserviceService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.ds.getlivingbyid(this.id).then((res) => {
      this.getdevices = res;
    });

    this.formGroup = new FormGroup({
      status: new FormControl(this.checked, Validators.requiredTrue),
    });
    //  $("#slider1").roundSlider({
    //     value: 45
    //   });
  }
  geallstatus(): void {
    if (this.getdevices[0].status == true) {
      this.checked == false;
    } else if (this.getdevices[0].status == false) {
      this.checked == true;
    }
  }
  openSnackBar() {}
  ngAfterViewInit() {
    if (this.getdevices[0].status == 'true') {
      $('#handle1').roundSlider({
        value: 1,
        max: '5',
        width: 15,
        handleSize: '+15',
        handleShape: 'dot',
        lineCap: 'round',
        sliderType: 'min-range',
        startAngle: 90,
        radius: 50,
        mouseScrollAction: true,

        drag: function (args) {
          // handle the drag event here
        },
        change: function (args) {
          // handle the change event here
        },
      });
    } else {
      $('#handle1').roundSlider('disable');
    }
  }
  updateFan(message: string, dstatus: string, action: string) {
    this.geallstatus();

    this.ds.updatefan(this.formGroup.value).subscribe((res) => {});
    this.geallstatus();

    this._snackBar.open(
      message,
      this.getdevices[0].status == true ? 'ON' : 'OFF',
      {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        panelClass: ['success-snackbar'],
      }
    );
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
