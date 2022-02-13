import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  usersLinks = [
    { text: 'All users', link: 'users' },
    { text: 'Suspended users', link: 'users' },
    { text: 'Admins', link: 'users' },
  ];
  propLinks = [
    { text: 'Active properties', link: 'properties' },
    { text: 'Inactive properties', link: 'properties' },
    { text: 'Pending properties', link: 'properties' },
  ];
  notificationLinks = [
    { text: 'Active notifications', link: 'notifications' },
    { text: 'Inactive notifications', link: 'notifications' },
    { text: 'Create notification', link: 'notifications' },
  ];
}
