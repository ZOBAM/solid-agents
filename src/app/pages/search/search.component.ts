import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PropertyService } from 'src/app/services/property.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private propService: PropertyService
  ) {
    this.propertyTypes = propService.propertyTypes;
    this.dealTypes = propService.dealTypes;
  }
  ngOnInit(): void {
    this.search();
    this.propService.getStates().subscribe((data) => {
      this.statesLga = data;
      for (let state in data) {
        this.states.push(state);
      }
    });
  }
  searchResults: any;
  loading = true;
  searchQuery = '';
  state = '';
  lga = '';
  town = '';
  statesLga: any;
  states: Array<string> = [];
  lgas: Array<string> = [];
  propertyTypes: Array<string>;
  dealTypes: Array<string>;
  filterQuery = new FormGroup({
    lowestPrice: new FormControl(),
    highestPrice: new FormControl(),
    propertyType: new FormControl(),
    dealType: new FormControl(),
  });
  getLgas() {
    this.lgas = this.statesLga[this.filterQuery.value.state];
  }
  search() {
    this.route.queryParamMap.subscribe((params) => {
      console.log(params);
      this.searchQuery = params.get('query') as string;
      this.state = params.get('state') as string;
      this.lga = params.get('lga') as string;
      this.town = <string>params.get('town');
      this.propService.search(params).subscribe((res) => {
        console.log(res);
        this.searchResults = res;
        this.loading = false;
      });
    });
  }
  filter() {
    this.loading = true;
    let values = this.filterQuery.value;
    let { dealType, propertyType, lowestPrice, highestPrice } = values;
    this.propService
      .search(
        {
          query: this.searchQuery,
          state: this.state,
          lga: this.lga,
          town: this.town,
          dealType,
          propertyType,
          lowestPrice,
          highestPrice,
        },
        true
      )
      .subscribe((res: any) => {
        //console.log(123);
        //console.log(res);
        if (Array.isArray(res)) {
          this.searchResults = res;
        } else {
          this.searchResults = [];
        }
        this.loading = false;
      });
  }
  getImage(images: any) {
    if (images) {
      return images[0].link;
    }
    return 'assets/images/no_image.png';
  }
}
