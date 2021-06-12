import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DataserviceService } from 'src/app/dataservice.service';

@Component({
  selector: 'app-sidebarcenter',
  templateUrl: './sidebarcenter.component.html',
  styleUrls: ['./sidebarcenter.component.css']
})
export class SidebarcenterComponent implements OnInit {
  title = 'veritas-homeautomation';
  color = 'accent';
  checked = false;
  onoff = 'Off';
  formGroup: FormGroup;
  alldata='';
  constructor(private ds:DataserviceService,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.ds.getData().then(res=>{
      this.alldata=res;
    })
    this.formGroup = new FormGroup({
      acceptTerms : new FormControl('', Validators.requiredTrue),
    });
  }
  onFormSubmit() {

  }

}
