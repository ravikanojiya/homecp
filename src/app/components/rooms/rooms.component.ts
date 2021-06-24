import { ThrowStmt } from '@angular/compiler';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { debounceTime, distinctUntilChanged, first } from 'rxjs/operators';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DataserviceService } from 'src/app/dataservice.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css'],
})
export class RoomsComponent implements OnInit {
  isLoadingb: boolean = true;
  isLoadingab: boolean = false;
  deviceData = [];
  errorMessage: boolean;
  devData = [];
  dev = [];
  roomnamedata = '';
  devForm: FormGroup;
  constructor(
    private ds: DataserviceService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<RoomsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { roomid: number; roomname: string }
  ) {}

  ngOnInit(): void {
    this.roomnamedata = this.data.roomname;
    // this.devForm=new FormGroup({
    //   devid:new FormControl('',Validators.required),
    //   value:new FormControl('',Validators.required),
    // })
    console.log(this.data.roomid, 'data');
    this.ds.getdevicebyroomid(this.data.roomid).subscribe((res) => {
      if (res.success == 1) {
        this.isLoadingb = false;
        this.deviceData = res.data.results;
        this.deviceData.sort(function (a, b) {
          return a.devname.localeCompare(b.devname);
        });

        this.deviceData.forEach((element) => {
          element.attribute.forEach((element) => {
            if (element.value == 'on') {
              element.value = true;
            } else {
              element.value = false;
            }
          });
        });
        console.log(this.deviceData, 'us');
      }
    });

    // console.log(this.getroombyaptid.aptid, 'room by apt id');
  }
  updateOnOff(value, id) {
    console.log(value, id, 'onofff');
    value.forEach((element) => {
      if (element.value == true) {
        element.value = 'on';
      } else {
        element.value = 'off';
      }
    });
    var model = {
      devid: id,
      attribute: value,
    };
    console.log(model, 'Request Body');
    this.isLoadingab = true;

    this.ds.updateOnOffstatus(model).subscribe((res) => {
    this.isLoadingab = false;

      value.forEach((element) => {
        if (element.value == 'on') {
          element.value = true;
        } else {
          element.value = false;
        }
      });
      // if (!this.deviceData) {
      //   return;
      // }
    });
    // this.ds.updateOnOffstatus(model).subscribe((res) => {
    //   if (res.success == 1) {
    //     this.isLoadingab = false;

    //     // alert('yooooooooo')
    //     this.ds.getdevbyid(id).subscribe(res=>{
    //       this.dev=res.data.results;
    //     })
    //     // this.ngOnInit()
    //   }
    // });
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
