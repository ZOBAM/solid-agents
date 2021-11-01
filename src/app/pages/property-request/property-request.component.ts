import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PropertyService } from 'src/app/services/property.service';

@Component({
  selector: 'app-property-request',
  templateUrl: './property-request.component.html',
  styleUrls: ['./property-request.component.scss'],
})
export class PropertyRequestComponent implements OnInit {
  constructor(private propService: PropertyService) {}

  ngOnInit(): void {
    this.propService.getStates().subscribe((data) => {
      this.statesLga = data;
      for (let state in data) {
        this.states.push(state);
      }
      console.log(this.states);
    });
  }
  statesLga: any;
  states: Array<string> = [];
  cities = ['New York', 'Rome', 'London', 'Istanbul', 'Paris'];
  propertyTypes = ['Land', 'House', 'Others'];
  dealTypes = ['Rent', 'Sale', 'Swap'];
  purposes = ['residential', 'commercial', 'mixed'];
  houseTypes = [
    'shop',
    'single room',
    'rooms & parlor',
    'self-contain',
    'flat',
    'bungalow',
    'warehouse',
    'event center',
  ];
  requestForm = new FormGroup({
    propertyType: new FormControl(),
    dealType: new FormControl(),
    purpose: new FormControl(),
    houseType: new FormControl(),
    state: new FormControl(),
    lga: new FormControl(),
    lowestPrice: new FormControl(),
    highestPrice: new FormControl(),
    town: new FormControl(),
    confirm: new FormControl(),
  });
  getLgas() {
    alert('Getting lgas soon');
  }
  request() {
    alert('request property');
    console.log(this.requestForm.value);
  }
}
