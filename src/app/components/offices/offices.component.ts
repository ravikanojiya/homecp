import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-offices',
  templateUrl: './offices.component.html',
  styleUrls: ['./offices.component.css']
})
export class OfficesComponent implements OnInit {

  // constructor(public dialogRef: MatDialogRef<OfficesComponent>,
  //   public dialog: MatDialog,  @Inject(MAT_DIALOG_DATA) public data: {name: string}) { }

  ngOnInit(): void {
  }
  // onNoClick(): void {
  //   this.dialogRef.close();
  // }
}
