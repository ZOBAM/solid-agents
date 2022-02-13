import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { PropertyService } from './services/property.service';
import { AuthService } from './services/auth.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter, map } from 'rxjs/operators';
import { NotificationService } from './services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild('notificationElem') noteElem!: ElementRef;
  title = 'solid-agents';
  userStatus: any;
  isEditing: any;
  user: any;
  showNotifications = false;
  notificationOpenTime = 0;
  notificationMessages: any;
  notificationCount: number;
  constructor(
    private authService: AuthService,
    private propService: PropertyService,
    private titleService: Title,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private renderer: Renderer2,
    private notificationService: NotificationService
  ) {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          let child = this.activatedRoute.firstChild;
          //console.log('This first child: '+ typeof child);
          //console.log('This first child: '+  child);
          while (child) {
            if (child.firstChild) {
              child = child.firstChild;
            } else if (child.snapshot.data && child.snapshot.data['title']) {
              //console.log(JSON.stringify(child.snapshot.data) );
              //console.log(child.snapshot);
              if (child.snapshot.params.type) {
                return child.snapshot.params.title.replace(/-/g, ' ');
              }
              return child.snapshot.data['title'];
            } else {
              return null;
            }
          }
          return null;
        })
      )
      .subscribe((data: any) => {
        if (data) {
          this.titleService.setTitle(data + ' :: Solid Agents');
        }
      });
    this.renderer.listen('window', 'click', (e: Event) => {
      if (this.showNotifications) {
        if (
          e.target != this.noteElem.nativeElement &&
          new Date().getTime() - this.notificationOpenTime > 2000
        ) {
          this.showNotifications = false;
        }
      }
    });
    this.notificationCount = notificationService.getNotificationCount();
  }
  ngOnInit(): void {
    this.authService.getLoggedIn();
    this.isEditing = this.propService.isEditing;
    setTimeout(() => {
      this.user = 'this.getUser()';
      if (this.authService.isLoggedIn()) {
        this.notificationService.getNotifications();
      }
    }, 1000);
  }
  getStatus() {
    return this.authService.isLoggedIn();
  }
  getUser() {
    return this.authService.currentUser;
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
  displayNotifications() {
    this.showNotifications = !this.showNotifications;
    this.notificationOpenTime = new Date().getTime();
    this.notificationMessages = this.notificationService.notifications;
    this.notificationCount = this.notificationService.getNotificationCount();
    console.log(this.notificationService.notifications);
    // this.showNotifications = true;
  }
}
