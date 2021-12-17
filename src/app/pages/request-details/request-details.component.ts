import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PropertyService } from 'src/app/services/property.service';

@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.scss'],
})
export class RequestDetailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private propertyService: PropertyService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.propertyRequestID = +params.get('id')!;
    });
    this.loading = true;
    this.propertyService
      .getRequests(this.propertyRequestID)
      .subscribe((data) => {
        console.log(data);
        this.propertyRequest = data;
        this.loading = false;
      });
  }
  loading = false;
  propertyRequestID: number = 0;
  propertyRequest: any;
  processDescription() {
    if (this.propertyRequest.type.toLowerCase() == 'land') {
      alert('This is a land request.');
    } else if (this.propertyRequest.type.toLowerCase() == 'house') {
      alert('This is a house request.');
    }
  }
}
