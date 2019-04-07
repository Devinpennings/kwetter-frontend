import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../../shared/services/user.service';
import {AuthService} from '../../../../shared/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  isLoading: boolean;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authServcie: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      biography: [null],
      location: [null],
      website: [null],
      picture: [null]
    });
  }

  submitForm(): void {
    this.isLoading = true;
    this.userService.create(this.form.value)
      .subscribe(() => {
        this.authServcie.login(this.form.value.username, this.form.value.password)
          .subscribe(() => {
            setTimeout(() => {
              this.router.navigate(['/']);
            }, 1000);
          });
      });
  }

}
