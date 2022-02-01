import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TokenInterceptor } from './http-inerceptors/token-interceptor';
import { HttpClientModule } from '@angular/common/http';
//ui templates
import { MaterialModule } from './modules/material/material.module';
import { PrimeModule } from './modules/primng.module';
//services
import { AuthService } from './services/auth.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
//pages components
import { AboutComponent } from './pages/about/about.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SagitComponent } from './pages/sagit/sagit.component';
//components
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ErrorComponent } from './components/error/error.component';
//form
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { UserAreaComponent } from './pages/user-area/user-area.component';
import { HowItWorksComponent } from './pages/how-it-works/how-it-works.component';
import { PropertyDetailsComponent } from './pages/property-details/property-details.component';
import { SearchComponent } from './pages/search/search.component';
import { RequestCallComponent } from './pages/request-call/request-call.component';
import { PropertyRequestComponent } from './pages/property-request/property-request.component';
import { RequestComponent } from './components/user/request/request.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { PropertiesComponent } from './components/user/properties/properties.component';
import { RequestDetailsComponent } from './pages/request-details/request-details.component';
import { SignupComponent } from './pages/signup/signup.component';
import { VerifyComponent } from './pages/verify/verify.component';
import { ChatsComponent } from './components/user/chats/chats.component';
import { ChatFormComponent } from './components/chat-form/chat-form.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    HomePageComponent,
    LoadingComponent,
    HeaderComponent,
    FooterComponent,
    SagitComponent,
    ErrorComponent,
    LoginComponent,
    UserAreaComponent,
    HowItWorksComponent,
    PropertyDetailsComponent,
    SearchComponent,
    RequestCallComponent,
    PropertyRequestComponent,
    RequestComponent,
    ProfileComponent,
    PropertiesComponent,
    RequestDetailsComponent,
    SignupComponent,
    VerifyComponent,
    ChatsComponent,
    ChatFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    PrimeModule,
  ],
  providers: [
    AuthService,
    ConfirmationService,
    Title,
    MessageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
