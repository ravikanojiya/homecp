import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  formGrouponoff: FormGroup;
  checked;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  devdata;
  isShow = false;
  constructor(
    private ds: DataserviceService,
    private actroute: ActivatedRoute,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { devid: number }
  ) {}

  ngOnInit(): void {
    this.ds.getdevbyid(this.data.devid).subscribe((res) => {
      // this.devicedata = res.data.results;
      console.log(this.devicedata, 'device by room');
    });
    if(this.devicedata[0].devname=='fan' && this.devicedata[0].onoffstatus=='1'){

      this.isShow=true;
      console.log(this.isShow,'s');

    }else{
      this.isShow=false;
      console.log(this.isShow,'s');

    }
    this.formGrouponoff = new FormGroup({
      devid: new FormControl(''),
        value: new FormControl('', Validators.requiredTrue),
    });
  }

  ngAfterViewInit() {
    $('#handle11').roundSlider({
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
        console.log('hi', args.value);
      },
    });
  }
  getadddev() {
    this.ds.getdevicebyroomid(this.roomid).subscribe((res) => {
      this.devicedata = res.data.result;
      console.log(res.data.results);
    });
  }
  updatedim(model) {
    this.ds.updatefandim(model).subscribe((res) => {
      console.log(res);
    });
  }
  upadateonoff(value, devid) {
    console.log(value,'v');

    if (value == 1 && devid==1) {
      this.isShow = true;
      console.log(this.isShow,'s');

    }
    console.log(value, 'gvs');
    let body = {
      onoffstatus: value,
      devid: devid,
    };
    this.ds.updatefan(body).subscribe((res) => {
      this.ds.getdevbyid(body.devid).subscribe((res) => {
        this.devdata = res.data.results;

        console.log(
          this.devdata[0].devname,
          this.devdata[0].onoffstatus == 1 ? 'ON' : 'OFF'
        );

        if (res.success == 1) {

          this._snackBar.open(
            this.devdata[0].devname + ' is turning',
            this.devdata[0].onoffstatus == 1 ? 'ON' : 'OFF',
            {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            }
          );
        }

      });
    });
    console.log(body);
  }
}
