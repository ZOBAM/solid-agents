import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PropertyService } from 'src/app/services/property.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-request-call',
  templateUrl: './request-call.component.html',
  styleUrls: ['./request-call.component.scss'],
})
export class RequestCallComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private propService: PropertyService,
    private messageService: MessageService,
    private router: Router
  ) {
    this.propertyTypes = propService.propertyTypes;
    this.dealTypes = propService.dealTypes;
  }
  ngOnInit(): void {}
  requestForm = this.fb.group({
    propertyType: ['', [Validators.required]],
    dealType: ['', [Validators.required]],
    callTime: ['', [Validators.required]],
    name: [
      '',
      [Validators.required, Validators.minLength(5), Validators.maxLength(29)],
    ],
    tel: [
      '',
      [Validators.required, Validators.minLength(11), Validators.maxLength(15)],
    ],
    confirm: ['', [Validators.required]],
  });
  propertyTypes: Array<string>;
  dealTypes: Array<string>;
  callTimes = [
    'morning (8:00am - 11:00am)',
    'afternoon (12:00pm - 3:00pm)',
    'evening (4:00pm - 6:00pm)',
    'anytime',
  ];
  requestCall() {
    console.log('about to send request');
    this.propService
      .request(this.requestForm.value, 'call')
      .subscribe((data: any) => {
        //console.log(data);
        if (data.status == 1) {
          this.messageService.add({
            severity: 'success',
            summary: 'Request Sent',
            detail: data.message,
            life: 4000,
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Request Sent',
            detail: data.message,
            life: 4000,
          });
        }
        setTimeout(
          () =>
            this.router.navigate(['/user-area/requests'], {
              queryParams: { currentTab: 'call' },
            }),
          2000
        );
      });
  }
}
