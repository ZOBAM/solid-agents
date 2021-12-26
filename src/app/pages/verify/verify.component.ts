import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss'],
})
export class VerifyComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private auth: AuthService
  ) {
    this.currentUser = auth.currentUser;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: any) => {
      console.log(params);
      this.type = params.get('contact');
    });
    this.verifyForm = this.fb.group({
      code: [
        '',
        [Validators.min(100000), Validators.required, Validators.max(999999)],
      ],
    });
  }
  type = '';
  verifyForm!: FormGroup;
  sentCount = 0;
  sending = false;
  resendCodeMsg = '';
  codeSent = false;
  currentUser: any;
  verifying = false;
  get code() {
    return this.verifyForm.get('code');
  }
  verify(resend = 0) {
    let code = this.verifyForm.value.code;
    console.log(this.verifyForm.value.code);
    if (resend) {
      this.sending = true;
    } else {
      this.verifying = true;
    }
    this.auth
      .verify({
        type: this.type,
        code,
        resend,
      })
      .subscribe((res: any) => {
        //status code: 1 = verified, 2 = code resent, 0 = invalid code
        this.sending = false;
        this.verifying = false;
        if (res.status == 1) {
          console.log('status is one');
          //this.currentUser.email_verified_at = 1;
          this.auth.updateUser({ email_verified_at: 1 });
          this.router.navigate(['/user-area']);
        } else {
          if (res.status == 2) {
            this.codeSent = true;
            setTimeout(() => {
              this.codeSent = false;
            }, 4000);
            this.sentCount++;
          }
          if (res.status == 0) {
            alert('Invalid code provided');
          }
        }
        console.log(res);
      });
  }
}
