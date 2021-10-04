import { Component, OnInit } from '@angular/core';
import { PropertyService } from './services/property.service';
import { AuthService } from './services/auth.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'solid-agents';
  userStatus: any;
  isEditing: any;
  constructor(private authService: AuthService, private propService: PropertyService, private titleService: Title, private router: Router, private activatedRoute:    ActivatedRoute){
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
          let child = this.activatedRoute.firstChild;
          //console.log('This first child: '+ typeof child);
          //console.log('This first child: '+  child);
          while (child) {
              if (child.firstChild) {
                  child = child.firstChild;
              } else if (child.snapshot.data &&    child.snapshot.data['title']) {
                //console.log(JSON.stringify(child.snapshot.data) );
                //console.log(child.snapshot);
                if(child.snapshot.params.type){
                  return child.snapshot.params.title.replace(/-/g,' ');
                }
                  return child.snapshot.data['title'];
              } else {
                  return null;
              }
          }
          return null;
      })
  ).subscribe( (data: any) => {
      if (data) {
          this.titleService.setTitle(data + ' :: Solid Agents');
      }
  });
  }
  ngOnInit(): void{
    this.authService.cast.subscribe(status=>{
      this.userStatus = status;
      this.isEditing = this.propService.isEditing;
    })
  }
  getStatus(){
    return this.authService.isLoggedIn();
  }
}
