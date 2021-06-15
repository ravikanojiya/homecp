import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
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
  color = 'accent';
  checked = false;
  onoff = 'Off';
  formGroup: FormGroup;
  livingdata;
  getaptbyid;
  getroombyaptid;
  aptid;
  navLinks: any[];
  activeLinkIndex = -1;
  constructor(
    private ds: DataserviceService,
    private activroutes: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router,
    public dialogRef: MatDialogRef<RoomsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { aptid: number }
  ) {}
  background: ThemePalette = undefined;

  toggleBackground() {
    this.background = this.background ? undefined : 'primary';
  }
  ngOnInit(): void {
    console.log(this.data.aptid,"data");

    this.ds.getroombyaptid(this.data.aptid).subscribe((res) => {
      this.getroombyaptid = res.data.result;
      console.log(res.data.result,"asdfasfasfadf");


      // console.log(this.getroombyaptid.aptid, 'room by apt id');
    });
    this.ds.getaptbyid(this.data.aptid).subscribe((res) => {
      this.getaptbyid = res.data.result;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
