import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(private authService: AuthService) {}

  user: any = {};
  ngOnInit(): void {
    this.getUser();
  }
  getUser() {
    this.user = this.authService.currentUser;
  }
}
