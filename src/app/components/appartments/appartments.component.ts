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
  checked = false;
  onoff = 'Off';
  formGroup: FormGroup;
  livingdata;
  getaptbyid;
  aptid;
  alldata = '';
  getallpt;
  // constructor(public fb:FormBuilder,public dialogRef: MatDialogRef<AppartmentsComponent>,
  //   public dialog: MatDialog,  @Inject(MAT_DIALOG_DATA) public data: {name: string}) { }
  constructor(
    private ds: DataserviceService,
    private activroutes: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.ds.getapt().subscribe((res) => {
      this.getallpt = res.data.result;
      console.log(res.data.result, 'apt');
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
      width: '1150px',
      data: { aptid: id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });

  }
  // openDialog(): void {
  //   const dialogRef = this.dialog.open(LivingareaComponent, {
  //     width: '650px',
  //   });

  //   dialogRef.afterClosed().subscribe((result) => {
  //     console.log('The dialog was closed');
  //   });
  // }
}
