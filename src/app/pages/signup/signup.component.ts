import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private errorService: ErrorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.myForm = this.fb.group({
      first_name: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(25),
        ],
      ],
      last_name: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(25),
        ],
      ],
      tel: [
        '',
        [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(14),
        ],
      ],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  error: boolean = false;
  submitting: boolean = false;
  errorMessage: string = '';
  myForm!: FormGroup;
  selectedDP!: File;
  dpPreviewURL = './assets/images/dp_placeholder.png';

  get first_name() {
    return this.myForm.get('first_name');
  }
  get last_name() {
    return this.myForm.get('last_name');
  }
  get tel() {
    return this.myForm.get('tel');
  }
  get email() {
    return this.myForm.get('email');
  }
  get password() {
    return this.myForm.get('password');
  }
  onSelectDP(event: any) {
    this.selectedDP = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (e: any) => {
      this.dpPreviewURL = e.target.result;
    };
  }
  register() {
    this.submitting = !this.submitting;
    this.error = false;
    let regDetail = new FormData();
    for (let v in this.myForm.value) {
      regDetail.append(v, this.myForm.value[v]);
    }
    regDetail.append('dp', this.selectedDP);
    this.authService.registerUser(regDetail).subscribe(
      (res: any) => {
        if (res.status == 1) {
          this.authService.setUser(res);
          this.router.navigate(['user-area']);
        }
        console.log(res);
      },
      (error) => {
        this.error = true;
        this.submitting = !this.submitting;
        this.errorMessage = error;
      }
    );
    console.log(this.myForm.value);
    console.log('Registering new User');
  }
}
