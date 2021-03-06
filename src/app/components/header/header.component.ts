import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() status: any;
  @Output() logout = new EventEmitter();
  @Output() public sidenavToggle = new EventEmitter();
  @Output() notificationToggle = new EventEmitter();
  @Output() signout = new EventEmitter();
  user = null;
  notificationsCount = 0;
  constructor(
    private authService: AuthService,
    private notificationService: NotificationService
  ) {}
  ngOnInit(): void {
    setInterval(() => {
      this.notificationsCount = this.notificationService.getNotificationCount();
    }, 2000);
  }
  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  };
  getUser() {
    return this.authService.currentUser;
  }
  endSession() {
    this.logout.emit();
  }
  showNotice() {
    this.notificationToggle.emit();
  }
}
