import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Note } from 'src/assets/inferfaces/notification';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private http: HttpClient) {}
  apiURL = environment.apiUrl + '/';
  notifications: Note[] = [];
  addNotification(payload: Note) {
    this.notifications.push(payload);
    console.log(this.getNotificationCount());
  }
  getNotificationCount() {
    return this.notifications.length;
  }
  getNotifications() {
    return this.http
      .get(this.apiURL + 'notifications')
      .subscribe((resp: any) => {
        console.log(resp);
        if (resp.notificationsCount) {
          this.addNotification(resp.notifications);
        } else {
          this.notifications = [];
        }
      });
  }
}
