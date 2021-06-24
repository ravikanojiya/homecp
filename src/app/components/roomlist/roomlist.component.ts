import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-roomlist',
  templateUrl: './roomlist.component.html',
  styleUrls: ['./roomlist.component.css']
})
export class RoomlistComponent implements OnInit {
  @Input() showMePartially: boolean;
  constructor() { }

  ngOnInit(): void {
  }

}
