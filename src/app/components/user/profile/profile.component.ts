import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private messageService: MessageService
  ) {}

  user: any = {};
  changingDP = false;
  payload: any = {};
  foundError = false;
  errorMessage = '';
  ngOnInit(): void {
    this.getUser();
  }
  getUser() {
    this.user = this.authService.currentUser;
  }
  imageSelected(event: any) {
    this.changingDP = true;
    let targetImg = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(targetImg);
    reader.onload = (e: any) => {
      if (targetImg.size / Math.pow(1024, 2) > 4) {
        this.foundError = true;
        this.errorMessage =
          'file size of ' +
          (targetImg.size / Math.pow(1024, 2)).toFixed(1) +
          'MB is too big. Max size allowed is 4MB';
        this.changingDP = false;
        return;
      } else {
        this.foundError = false;
      }
      this.user.dp_link = e.target.result;
      this.payload['uploadImage'] = targetImg;
      this.payload['action'] = 'updateDP';
    };
  }
  updateDP() {
    let formData = new FormData();
    formData.append('uploadImage', this.payload.uploadImage);
    formData.append('action', 'updateDP');
    formData.append('userID', this.authService.currentUser.id);
    this.authService.registerUser(formData).subscribe((resp: any) => {
      if (resp.status == 1) {
        this.authService.updateUser({ dp_link: this.user.dp_link });
        this.messageService.add({
          severity: 'success',
          summary: 'DP Update',
          detail: 'Your display image has been updated',
        });
      }
      this.changingDP = false;
    });
  }
}
