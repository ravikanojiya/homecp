import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
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
import { ActivatedRoute, Router } from '@angular/router';
import { DataserviceService } from 'src/app/dataservice.service';
import { LivingInt } from '../livingarea/living-int';
import { LivingareaComponent } from '../livingarea/livingarea.component';
import { RoomsComponent } from '../rooms/rooms.component';

@Component({
  selector: 'app-appartments',
  templateUrl: './appartments.component.html',
  styleUrls: ['./appartments.component.css'],
})
export class AppartmentsComponent implements OnInit {
  color = 'accent';
  onoff = 'Off';
  formGroup: FormGroup;
  livingdata;
  getaptbyid;
  aptid;
  alldata = '';
  getallpt;
  roomid;
  devicedata;
  uid;
  // constructor(public fb:FormBuilder,public dialogRef: MatDialogRef<AppartmentsComponent>,
  //   public dialog: MatDialog,  @Inject(MAT_DIALOG_DATA) public data: {name: string}) { }
  constructor(
    private ds: DataserviceService,
    private activroutes: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.roomid = this.activroutes.snapshot.params.id;
    this.uid = sessionStorage.getItem('uid');

    this.ds.getaptbyuid(this.uid).subscribe((res) => {
      this.getallpt = res.data.result;
    });

    // this.ds.getData().then(res=>{
    //   this.alldata=res;
    // })
    this.formGroup = new FormGroup({
      acceptTerms: new FormControl('', Validators.requiredTrue),
    });
  }

  openDialog(id): void {
    const dialogRef = this.dialog.open(RoomsComponent, {
      width: '1000px',
      data: { aptid: id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.ds.getapt().subscribe((res) => {
        this.getallpt = res.data.result;
      });
      this.ds.getdevicebyroomid(this.roomid).subscribe((res) => {
        this.devicedata = res.data.result;
      });
    });
  }

}
