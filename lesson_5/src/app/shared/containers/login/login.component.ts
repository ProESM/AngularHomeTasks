import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../services/alert.service';
import { IUser } from '../../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private user: IUser = {
    login: '',
    password: ''
  };

  loading = false;
  returnUrl: string;

  constructor(
    private auth: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    // reset login status
    this.auth.logOut();
 
    // get return url from route parameters or default to '/'
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
  }

  login(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.loading = true;
    this.auth.authenticate(this.user)     
      .subscribe(
        data => {
          console.log("action is here");
          this.router.navigate([this.returnUrl]);
        },
        error => {
         this.alertService.error(error);
         this.loading = false;
        }
      );
    
  }
}
