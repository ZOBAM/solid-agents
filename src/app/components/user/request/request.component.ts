import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss'],
})
export class RequestComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}
  callRequests: string[] = [];
  propertyRequests: string[] = [];
  currentIndex = 0;
  loading = true;

  ngOnInit(): void {
    this.callRequests = this.authService.userCallRequests;
    this.propertyRequests = this.authService.userPropertyRequests;
    this.loading = false;
    console.log(this.callRequests);
    this.route.queryParams.subscribe((param: any) => {
      if (param['currentTab'] == 'call') {
        this.currentIndex = 1;
      }
    });
  }
}
