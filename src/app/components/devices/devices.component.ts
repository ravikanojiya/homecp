import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { DataserviceService } from 'src/app/dataservice.service';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css'],
})
export class DevicesComponent implements OnInit, AfterViewInit {
  devicedata;
  roomid;
  formGroup: FormGroup;
  checked=false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private ds: DataserviceService,
    private actroute: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.roomid = this.actroute.snapshot.params.id;
    console.log(this.roomid, 'rromid');

    this.ds.getdevicebyroomid(this.roomid).subscribe((res) => {
      this.devicedata = res.data.result;
      console.log(res.data.result);
    });

    this.formGroup = new FormGroup({
      devid: new FormControl(''),
      onoffstatus: new FormControl(this.checked, Validators.requiredTrue),
    });
  }
  geallstatus(): void {
    if (this.devicedata.onoffstatus == 0) {
      this.checked == true;
    } else if (this.devicedata.onoffstatus == 1) {
      this.checked == false;
    }
  }
  ngAfterViewInit() {
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
  }
  getadddev() {
    this.ds.getdevicebyroomid(this.roomid).subscribe((res) => {
      this.devicedata = res.data.result;
      console.log(res.data.results);
    });
  }
  updateFan(message: string, dstatus: string, devid: number) {
    this.geallstatus();
    this.formGroup.get('devid').setValue(devid);

    this.ds.updatefan(this.formGroup.value).subscribe((res) => {});

    this._snackBar.open(message, this.checked == true ? 'ON' : 'OFF', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: ['success-snackbar'],
    });
    this.geallstatus();
  }
}
