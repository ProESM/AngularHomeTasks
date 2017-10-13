import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../services/alert.service';
import { IUser } from '../../models/user';
import 'rxjs/add/operator/takeWhile';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  private alive: boolean;
  
  private user: IUser = {
    email: '',
    password: ''
  };

  loading = false;
  returnUrl: string;

  public validationErrorMessages: { [id: string]: string } = {};

  constructor(
    private auth: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private alertService: AlertService
  ) {
    this.alive = true;
  }

  ngOnInit() {
    // reset login status
    this.auth.logOut();
 
    // get return url from route parameters or default to '/'
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
  }

  login(form: NgForm) {
    this.validationErrorMessages = {};
    if (form.invalid) {
      Object.keys(form.controls).forEach(controlName => {
        if (!form.controls[controlName].valid) {
          this.validationErrorMessages[controlName] = form.controls[controlName].errors.message;
          if (controlName === 'email') {
            this.validationErrorMessages[controlName] = "Введите корректный email";
          };
        }
      });
      return;
    }

    this.loading = true;
    this.auth.authenticate(this.user)     
      .takeWhile(() => this.alive)
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
         this.alertService.error(error);
         this.loading = false;
        }
      );
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
