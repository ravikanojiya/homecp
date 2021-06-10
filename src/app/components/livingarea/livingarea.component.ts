import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataserviceService } from 'src/app/dataservice.service';
import { LivingInt } from './living-int';
import 'round-slider';
@Component({
  selector: 'app-livingarea',
  templateUrl: './livingarea.component.html',
  styleUrls: ['./livingarea.component.css'],
})
export class LivingareaComponent implements OnInit, AfterViewInit {
  getdevices;
  checked;
  formGroup: FormGroup;
  id: number = 1;
  fanstatus;
  constructor(
    public dialogRef: MatDialogRef<LivingareaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: LivingInt,
    private ds: DataserviceService
  ) {}

  ngOnInit(): void {
    this.ds.getlivingbyid(this.id).then((res) => {
      this.getdevices = res;
      console.log(res);
      console.log('asdfasdfasdfasdfasdf' + this.getdevices[0].status);

    });

    this.formGroup = new FormGroup({
      status: new FormControl(this.checked, Validators.requiredTrue),
    });
    //  $("#slider1").roundSlider({
    //     value: 45
    //   });
  }
  geallstatus(): void {
    if (this.getdevices[0].status == true) {
      this.checked == true;
    } else if (this.getdevices[0].status == false) {
      this.checked == false;
    }
  }
  ngAfterViewInit() {
    $('#handle1').roundSlider({
      value: 0,
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
      },
    });
  }
  updateFan() {
    // if(this.formGroup.value==true){

    // }
    console.log('fporm group' + this.formGroup.status);
    // if(this.formGroup.status=='VALID'){
    //   this.formGroup.status==false
    // }else{
    //   this.formGroup.status==true

    // }
    this.ds.updatefan(this.formGroup.value).subscribe((res) => {});
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
