import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() status: any;
  @Output() logout = new EventEmitter();
  @Output() public sidenavToggle = new EventEmitter();
  @Output() signout = new EventEmitter();
  user = null;
  constructor(private authService: AuthService) {}
  ngOnInit(): void {}
  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  };
  getUser() {
    return this.authService.currentUser;
  }
  endSession() {
    this.logout.emit();
  }
}
