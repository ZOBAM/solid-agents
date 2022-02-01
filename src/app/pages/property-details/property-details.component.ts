import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PropertyService } from 'src/app/services/property.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.scss'],
})
export class PropertyDetailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private prop: PropertyService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    let userID = this.auth.isLoggedIn() ? '/' + this.auth.currentUser.id : '';
    this.route.paramMap.subscribe((params) => {
      this.propType = params.get('type');
      this.propID = +params?.get('id')!;
      this.prop
        .getProperties(this.propType + '/' + this.propID + userID)
        .subscribe((res) => {
          this.setProperty(res);
          console.log(`${res}`);
        });
      console.log(`This ${this.propType} property ID is: ${this.propID}`);
    });
  }
  propType: any = '';
  propID: number = 0;
  property: any;
  showTel = false;
  showChat = false;
  propertyFetched: boolean = false;
  excludedFields = ['property_image', 'house', 'user_id'];
  images: string[] = [];
  excludedProps = ['created_at', 'updated_at', 'id', 'property_id'];
  house: any;
  showDetails = false;

  setProperty(property: any) {
    console.log(property);
    this.property = property;
    this.propertyFetched = true;
    this.images = this.property.property_image;
    if (this.property.house) {
      let house = new Map();
      for (let prop in property.house) {
        if (!this.excludedProps.includes(prop)) {
          house.set(prop, property.house[prop]);
        }
        this.house = house;
        //console.log(house);
      }
      /* this.property.house = this.property.house.filter(
        (elem: any, index: any) => {
          elem;
          return this.excludedProps.includes(index);
        }
      ); */
    }
    return property;
  }
  isPropertyOwner(propID: number) {
    if (this.auth.getLoggedIn()) {
      if (
        this.auth.currentUser !== undefined &&
        this.auth.currentUser.id == propID
      )
        return true;
      else {
        return false;
      }
    } else return false;
  }
  formatHouseProps(value: any, name: string) {
    if (value == 1) {
      if (!['total_rooms', 'bedrooms', 'parking_space_size'].includes(name)) {
        return 'Yes';
      }
      return value;
    } else if (value == 0) {
      return 'No';
    } else if (value == null) {
      return 'N/A';
    } else {
      return value;
    }
  }
  like(propID: number) {
    if (this.auth.isLoggedIn()) {
      if (this.property.liked) {
        this.property.likes--;
      } else {
        this.property.likes++;
      }
      this.property.liked = !this.property.liked;
      this.prop
        .like({ propID, userID: this.auth.currentUser.id })
        .subscribe((res) => {
          console.log(res);
        });
    } else {
      alert('log in first to like properties');
    }
  }
}
