import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
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

  constructor(private ds: DataserviceService, public dialog: MatDialog) {}

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
  apt() {
    this.aptselected = true;

    this.offselected = false;
  }
  office() {
    this.aptselected = false;
    this.offselected = true;
  }
  onFormSubmit() {}
}
