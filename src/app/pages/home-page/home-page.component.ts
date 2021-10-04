import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PropertyService } from '../../services/property.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(private http : HttpClient, private propertyService : PropertyService) { }
  properties: any = null
  ngOnInit(): void {
    this.fetchProperties()
  }
  
  fetchProperties(){
    this.propertyService.getProperties().subscribe(res=>{
      if(Object.keys(res).length>0)
      this.properties = res
      console.log(res)
    })
    /* this.propertyService.getUsers().subscribe(res => {
      console.log('User get request testing api security')
      console.log(res)
    }) */
  }
  getPropertyImg(property: any){
    if(property.property_image)
      return property.property_image[0].link;
    return "No image";
  }
}
