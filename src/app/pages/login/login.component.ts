import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) console.log('Already logged in');
    this.router.navigate(['/user-area']);
    this.loginForm = this.fb.group({
      email: [
        '',
        [
          //Validators.email,
          Validators.required,
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
    this.loginForm.valueChanges.subscribe((val) => {
      //console.log(val);
    });
  }
  token: any;
  user = null;
  error: boolean = false;
  submitting: boolean = false;
  errorMessage: any;
  loginForm!: FormGroup;
  isLoggedIn = this.authService.isLoggedIn();
  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }
  processLogin(data: any) {
    this.authService.setUser(data);
  }
  setErrorMsg(data: any) {
    this.errorMessage = data.message;
    this.error = true;
  }
  login() {
    this.submitting = !this.submitting;
    this.error = false;
    let postData = new FormData();
    for (let v in this.loginForm.value) {
      postData.append(v, this.loginForm.value[v]);
    }
    this.authService.login(postData).subscribe(
      (res) => {
        if (res.hasOwnProperty('user')) {
          this.authService.setUser(res);
          this.router.navigate(['user-area']);
          console.log(res);
        } else {
          //couldn't login
          this.setErrorMsg(res);
          this.submitting = false;
          console.log(res);
        }
      },
      (error) => {
        this.submitting = !this.submitting;
        this.errorMessage = error;
      }
    );
  }
}
