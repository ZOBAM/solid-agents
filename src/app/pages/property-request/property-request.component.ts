import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { PropertyService } from 'src/app/services/property.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-property-request',
  templateUrl: './property-request.component.html',
  styleUrls: ['./property-request.component.scss'],
})
export class PropertyRequestComponent implements OnInit {
  constructor(
    private propService: PropertyService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private router: Router
  ) {
    this.requestForm
      .get('priceRange')
      ?.valueChanges.pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((values) => {
        //console.log(values);
        this.requestForm.patchValue({ lowestPrice: values[0] });
        this.requestForm.patchValue({ highestPrice: values[1] });
      });
    this.requestForm.valueChanges
      .pipe(debounceTime(500))
      .subscribe((values) => {
        //console.log(values.lowestPrice);
        //console.log(values.highestPrice);
        this.requestForm.patchValue({
          priceRange: [values.lowestPrice, values.highestPrice],
        });
      });
  }

  ngOnInit(): void {
    this.propService.getStates().subscribe((data) => {
      this.statesLga = data;
      for (let state in data) {
        this.states.push(state);
      }
    });
  }
  statesLga: any;
  states: Array<string> = [];
  lgas: Array<string> = [];
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
  requestForm = this.fb.group({
    propertyType: ['', Validators.required],
    dealType: ['', Validators.required],
    purpose: ['', [Validators.required]],
    plots: [1, [Validators.required, Validators.min(1), Validators.max(200)]],
    houseType: ['', [Validators.required]],
    state: ['', [Validators.required]],
    lga: ['', [Validators.required]],
    town: ['', [Validators.required]],
    priceRange: [this.priceRange],
    lowestPrice: [this.priceRange[0]],
    highestPrice: [this.priceRange[1]],
    detail: [],
    confirm: [, [Validators.required]],
  });

  setProperty() {
    //alert('Property is now set.');
    this.propType = this.requestForm.value.propertyType;
    let fx: FormControl;
    if (this.requestForm.value.propertyType == 'House') {
      fx = this.requestForm.get('purpose') as FormControl;
    } else {
      fx = this.requestForm.get('houseType') as FormControl;
    }
    fx.patchValue(null);
    fx.setErrors(null);
    console.log(this.requestForm.get('houseType'));
  }
  getLgas() {
    //alert('Getting lgas soon');
    this.lgas = this.statesLga[this.requestForm.value.state];
  }
  request() {
    //console.log(this.requestForm.value);
    this.propService
      .request(this.requestForm.value)
      .subscribe((response: any) => {
        console.log(response);
        if (response.status == 1) {
          this.messageService.add({
            severity: 'success',
            summary: 'Request Sent',
            detail: response.message,
            life: 4000,
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Request Sent',
            detail: response.message,
            life: 4000,
          });
        }
        setTimeout(() => this.router.navigate(['/user-area/requests']), 4000);
      });
  }
}
