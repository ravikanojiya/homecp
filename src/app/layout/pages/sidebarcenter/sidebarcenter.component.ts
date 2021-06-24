import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DevicesComponent } from 'src/app/components/devices/devices.component';
import { RoomsComponent } from 'src/app/components/rooms/rooms.component';
import { DataserviceService } from 'src/app/dataservice.service';

@Component({
  selector: 'app-sidebarcenter',
  templateUrl: './sidebarcenter.component.html',
  styleUrls: ['./sidebarcenter.component.css'],
})
export class SidebarcenterComponent implements OnInit {
  title = 'veritas-homeautomation';
  color = 'accent';
  checked = false;
  onoff = 'Off';
  formGroup: FormGroup;
  alldata = '';
  getallpt;
  offselected = false;
  aptselected = true;
  showVar: boolean = true;
  getAptType;
  uid;
  getuseraptdata;
  userdata;
  errorMessage: Boolean = true;
  roomData;
  isLoading: Boolean = false;
  isLoadinga: Boolean = false;
  isLoadingb: Boolean = false;
  apterrormsg: any = "Record Doesn't Exist!!";
  deviceData;
  uname:any;
  constructor(private ds: DataserviceService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.uid = localStorage.getItem('uid');
    this.uname= localStorage.getItem('uname');
    console.log(this.uname,"username");

      // this.ds.getUser(this.uid).subscribe((res) => {
      //   this.userdata = res.data.results[0];
      //   console.log("Grtting Userdata :-", this.userdata)
      // });
    this.ds.getapt().subscribe((res) => {
      this.getallpt = res.data.result;
      console.log(res.data.result, 'apt');
    });
    this.ds.getAptTypes().subscribe((res) => {
      this.getAptType = res.data.results;
    });
    // this.ds.getData().then(res=>{
    //   this.alldata=res;
    // })
    this.formGroup = new FormGroup({
      acceptTerms: new FormControl('', Validators.requiredTrue),
    });
  }
  openDialog(id, rname): void {
    const dialogRef = this.dialog.open(RoomsComponent, {
      width: 'auto',
      data: { roomid: id, roomname: rname }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result){
        this.roomlist(id);
      }
    });
  }

  roomlist(id) {
    this.isLoading = true;

    this.ds.getroombyaptid(id).subscribe((res) => {
      this.roomData = res.data.results;

      if (res.success == 1) {
        this.isLoading = false;
      }
      console.log(this.roomData, 'roomdata');
    },(err) => {
      this.isLoadinga = false;
      this.apterrormsg = err.error.message;
      this.errorMessage = true;
    });
  }
  getLogin() {
    if (localStorage.getItem('islogin')) {
      return true;
    }
    return false;
  }
  deviceList(id) {
    this.isLoadingb = true;
    this.ds.getdevicebyroomid(id).subscribe((res) => {
      this.deviceData = res.data.results;
      this.deviceData.sort(function (a, b) {
        return a.devname.localeCompare(b.devname);
      });
      if (res.success == 1) {
        this.isLoadingb = false;
        console.log(this.deviceData, 'us');

        this.errorMessage = false;
      }
      if (res.success == 0) {
        this.errorMessage = true;
      }
    });
  }

  getAptbyid(id: any) {
    this.isLoadinga = true;
    this.getuseraptdata = [];
    this.uid = localStorage.getItem('uid');

    var bb = {
      id: this.uid,
      apttypeid: id,
    };
    this.ds.getaptbyuid(bb).subscribe(
      (res) => {
        this.getuseraptdata = res.data.result;
        if (res.success == 1) {
          this.isLoadinga = false;
          console.log(this.getuseraptdata, 'us');
          this.errorMessage = false;
        }
        // if (res.success == 0) {
        //   this.errorMessage = true;
        // }
      },
      (err) => {
        this.isLoadinga = false;
        this.apterrormsg = err.error.message;
        this.errorMessage = true;
      }
    );
  }
  apt() {
    this.aptselected = true;

    this.offselected = false;
  }
  office() {
    this.aptselected = false;
    this.offselected = true;
  }
}
