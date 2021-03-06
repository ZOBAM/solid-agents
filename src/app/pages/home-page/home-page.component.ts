import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../../services/property.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  constructor(
    private propertyService: PropertyService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.propertyService
      .getRequests()
      .subscribe((data) => (this.propertyRequests = data));
  }
  properties: any = null;
  propertyRequests: any = [];
  statesLga: any;
  states: Array<string> = [];
  lgas: Array<string> = [];
  searchQuery = new FormGroup({
    query: new FormControl(''),
    state: new FormControl(),
    lga: new FormControl(),
    town: new FormControl(),
  });
  cities = ['New York', 'Rome', 'London', 'Istanbul', 'Paris'];
  ngOnInit(): void {
    this.fetchProperties();
    this.propertyService.getStates().subscribe((data) => {
      this.statesLga = data;
      for (let state in data) {
        this.states.push(state);
      }
    });
  }

  fetchProperties() {
    this.propertyService.getProperties().subscribe((res) => {
      if (Object.keys(res).length > 0) this.properties = res;
      console.log(res);
    });
    /* this.propertyService.getUsers().subscribe(res => {
      console.log('User get request testing api security')
      console.log(res)
    }) */
  }
  getPropertyImg(property: any) {
    if (property.property_image) return property.property_image[0].link;
    return 'assets/images/no_image.png';
  }
  getPropertyTitle(title: string) {
    if (title.length > 19) {
      return title.substr(0, 17) + '...';
    }
    return title;
  }
  getLgas() {
    //alert('Getting lgas soon');
    this.lgas = this.statesLga[this.searchQuery.value.state];
  }
  search() {
    let values = this.searchQuery.value;
    if (values.query.trim() == '') {
      this.messageService.add({
        severity: 'error',
        summary: 'Empty Query',
        detail: "You can't search empty value",
      });
      this.searchQuery.patchValue({
        query: '',
      });
    } else {
      this.router.navigate(['search'], {
        queryParams: {
          query: values.query,
          state: values.state,
          lga: values.lga,
          town: values.town,
        },
      });
    }
  }
  formatMoney(amount: number) {
    return this.propertyService.formatMoney(amount);
  }
}
