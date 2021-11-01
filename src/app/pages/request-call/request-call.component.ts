import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-request-call',
  templateUrl: './request-call.component.html',
  styleUrls: ['./request-call.component.scss'],
})
export class RequestCallComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  propertyTypes = ['Land', 'House', 'Others'];
  dealTypes = ['Rent', 'Sale', 'Swap'];
  callTimes = ['morning', 'afternoon', 'evening', 'anytime'];
  propertyType = new FormControl();
  dealType = new FormControl();
  callTime = new FormControl();
}
