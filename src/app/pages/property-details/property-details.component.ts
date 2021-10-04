import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PropertyService } from 'src/app/services/property.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.scss']
})
export class PropertyDetailsComponent implements OnInit {

  constructor(private route : ActivatedRoute, private prop: PropertyService, private auth: AuthService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params=>{
      this.propType  = params.get('type');
      this.propID = +params?.get('id')!;
      this.prop.getProperties(this.propType+'/'+this.propID).subscribe(res=>{
        this.setProperty(res);
        //console.log(`${res}`);
      })
      console.log(`This ${this.propType} property ID is: ${this.propID}`);
    })
  }
  propType: any = '';
  propID: number = 0;
  property: any;
  propertyFetched : boolean = false;
  excludedFields = ['property_image', 'house', 'user_id'];

  setProperty(property: any){
    this.property = property;
    this.propertyFetched = true;
    console.log(property);
    return property;
  }
  showEditButton(propID:number){
    if(this.auth.getLoggedIn()){
      if(this.auth.currentUser !== undefined && this.auth.currentUser.id == propID)
        return true;
      else{
        return false;
      }
    }else
    return false;
  }
}
