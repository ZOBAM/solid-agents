import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { PropertyService } from 'src/app/services/property.service';
import { Property } from 'src/assets/inferfaces/property';

@Component({
  selector: 'app-properties-page',
  templateUrl: './properties-page.component.html',
  styleUrls: ['./properties-page.component.scss'],
})
export class PropertiesPageComponent implements OnInit {
  constructor(
    private propService: PropertyService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.propService.getProperties('', true, {}).subscribe((resp: any) => {
      this.properties = resp.properties;
      this.loading = false;
    });
  }
  properties!: Property[];
  loading = false;
  loadingAdminAction = false;
  currentPropertyID = 0;
  adminAction(event: any, action: string, property: Property) {
    this.currentPropertyID = property.id;
    let message = 'Are you sure you want to Approve (' + property.title + ')?';
    let approved_by: number | null = 1;
    if (action == 'suspend') {
      message = 'Are you sure you want to Suspend (' + property.title + ')?';
      approved_by = null;
    }
    this.confirmationService.confirm({
      target: event.target,
      message,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.loadingAdminAction = true;
        this.propService
          .adminAction({
            action,
            propertyID: property.id,
          })
          .subscribe((resp: any) => {
            this.loadingAdminAction = false;
            this.properties.forEach((elem) => {
              if (elem.id == property.id) {
                elem.approved_by = resp.approved_by;
              }
            });
          });
      },
    });
  }
}
