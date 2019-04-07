import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthService} from '../../../../shared/services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private returnUrl: string;
  form: FormGroup;
  isLoading: boolean;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  submitForm(): void {
    this.isLoading = true;
    this.authService.login(this.form.value.username, this.form.value.password)
      .subscribe(() => {
        setTimeout(() => {
          this.router.navigate([this.returnUrl]);
        }, 1000);
      });
  }

}
