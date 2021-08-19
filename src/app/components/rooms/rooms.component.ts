import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { DataserviceService } from 'src/app/dataservice.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css'],
})
export class RoomsComponent implements OnInit {
  isLoadingb: boolean = true;
  isLoadingab: boolean = false;
  deviceData: any = [];
  errorMessage: boolean;
  devData: any;
  @ViewChild('devname') devname: any;
  dev = [];
  roomnamedata = '';
  attdata: any = [];
  isShow: boolean;
  devForm: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(
    private ds: DataserviceService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<RoomsComponent>,
    private sb: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { roomid: number; roomname: string }
  ) {}

  ngOnInit(): void {
    this.roomnamedata = this.data.roomname;

    console.log(this.data.roomid, 'data');
    this.ds.getdevicebyroomid(this.data.roomid).subscribe((res) => {
      if (res.success == 1) {
        this.isLoadingb = false;
        this.deviceData = res.data.results;
        this.deviceData.sort((a, b) =>
          JSON.stringify(a.devid).localeCompare(JSON.stringify(b.devid))
        );
        this.deviceData.forEach((element) => {
          element.devices.forEach((elem) => {
            elem.data.forEach((ele) => {
              if (ele.value == 'ON') {
                ele.value = true;
              } else {
                ele.value = false;
              }
            });
          });
        });
        console.log(this.deviceData, 'devroomid');
      }
    });
  }
  //   ngAfterViewInit(){
  // console.log(this.devname.nativeElement.value,"Deice name");

  //   }
  editdevname() {
    this.isShow = true;
  }
  closedevdata(){
    this.isShow = false;

  }
  chng(event, devid) {
    var devnamebody = {
      devicename: event,
      id: devid,
    };
    console.log(event, 'event fire');
    console.log(devnamebody, 'devnamebody');
    this.ds.updatedevname(devnamebody).subscribe((res) => {
      this.ngOnInit();
      this.isShow = false;
    });
  }
  updateOnOff(value, Data) {
    var arr = [],
      finarr = [];
    Data.devices.forEach((el) => {
      finarr.push({
        id: el.id,
        data: el.data.map((item) => {
          console.log('===========', item.value);
          return {
            trait: item.attribute,
            value: item.value == true ? 'ON' : 'OFF',
          };
        }),
      });
    });
    console.log('Gett', Data);
    var model = {
      devid: Data.manfdevid,
      commands: finarr,
    };
    console.log(model, 'Request Body');
    this.isLoadingab = true;

    this.ds.updateOnOffstatus(model).subscribe((res) => {
      console.log(res);
      if (res.success == 1) {
        this.isLoadingab = false;
      }
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  getdeviceData(id) {
    this.ds.getdevbyid(id).subscribe((res) => {
      this.devData = res.data.results;
    });
  }
}
