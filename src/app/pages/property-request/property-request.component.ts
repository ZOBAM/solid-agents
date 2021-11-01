import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PropertyService } from 'src/app/services/property.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-property-request',
  templateUrl: './property-request.component.html',
  styleUrls: ['./property-request.component.scss'],
})
export class PropertyRequestComponent implements OnInit {
  constructor(private propService: PropertyService) {
    this.requestForm
      .get('priceRange')
      ?.valueChanges.pipe(debounceTime(500))
      .subscribe((values) => {
        //console.log(values.priceRange);
        this.requestForm.patchValue({ lowestPrice: values[0] });
        this.requestForm.patchValue({ highestPrice: values[1] });
      });
  }

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
  propType: string = 'Land';
  priceRange = [10000, 6000000];
  cities = ['New York', 'Rome', 'London', 'Istanbul', 'Paris'];
  propertyTypes = ['Land', 'House'];
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
    propertyType: new FormControl(this.propType),
    dealType: new FormControl(),
    purpose: new FormControl(),
    houseType: new FormControl(),
    state: new FormControl(),
    lga: new FormControl(),
    priceRange: new FormControl(this.priceRange),
    lowestPrice: new FormControl({ value: this.priceRange[0], disabled: true }),
    highestPrice: new FormControl({
      value: this.priceRange[1],
      disabled: true,
    }),
    town: new FormControl(),
    confirm: new FormControl(),
  });

  setProperty() {
    alert('Property is now set.');
    this.propType = this.requestForm.value.propertyType;
    //console.log(this.requestForm.value);
  }
  getLgas() {
    alert('Getting lgas soon');
  }
  request() {
    alert('request property');
    console.log(this.requestForm.value);
  }
}
