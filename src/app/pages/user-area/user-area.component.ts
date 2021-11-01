import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { PropertyService } from 'src/app/services/property.service';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-user-area',
  templateUrl: './user-area.component.html',
  styleUrls: ['./user-area.component.scss'],
})
export class UserAreaComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private propService: PropertyService,
    private confirmService: ConfirmationService
  ) {}
  user: any = {};
  userProperties: any = {};
  columnsToDisplay = ['index', 'type', 'title', 'price', 'action'];
  ngOnInit(): void {
    this.getUser();
    this.getUserProperties();
  }
  getUser() {
    this.user = this.authService.currentUser;
  }
  getUserProperties() {
    this.propService.getProperties(this.user.id).subscribe((res) => {
      this.userProperties = res;
      this.propService.userProperties = res;
      //console.log(res);
    });
  }
  deleteProp(event: any, id: number) {
    // this.userProperties.splice(index,1);
    let confirmDelete = confirm(
      'Do you really want to delete this property? This action cannot be undone. Click "OK" to proceed or "Cancel" to return back'
    );
    this.confirmService.confirm({
      target: event.target,
      message: 'Are you sure that you want to delete this property?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        alert('accepted');
      },
      reject: () => {
        alert('rejected');
      },
    });
    if (confirmDelete) {
      this.userProperties = this.userProperties.filter((prop: any) => {
        return prop.id != id;
      });
      this.propService.deleteProperty(id).subscribe((res) => {
        //console.log(res);
        alert('Property Deleted!');
      });
    }
  }
}
