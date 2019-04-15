import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {KweetService} from '../../../../shared/services/kweet.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-dashboard-update',
  templateUrl: './dashboard-update.component.html',
  styleUrls: ['./dashboard-update.component.scss']
})
export class DashboardUpdateComponent implements OnInit {
  isLoading: boolean;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private kweetService: KweetService
  ) {
    this.isLoading = false;
  }

  ngOnInit() {
    this.form = this.fb.group({
      message: [null, [Validators.required]],
    });
  }

  post() {
    this.isLoading = true;
    this.kweetService.create(this.form.value.message).subscribe(() => {
      setTimeout(() => {
        this.isLoading = false;
        this.form.reset();
      }, 1000);
    });
  }
}
