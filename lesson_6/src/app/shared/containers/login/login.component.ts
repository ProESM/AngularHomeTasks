import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm, FormControl } from '@angular/forms';
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

  @ViewChild('loginForm', { read: NgForm })
  public myLoginForm: NgForm;

  //@ViewChild("loginInput")
  //private loginInput: FormControl;

  loading = false;
  returnUrl: string;

  validationMessages: { [id: string] : string; } = {};
  
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

  ngAfterViewInit(): void {
    console.log('loginForm=', this.myLoginForm);
    //console.log('loginInput=', this.loginInput);
  }

  getForm(): void {
    console.log('loginForm=', this.myLoginForm);
  }

  login(form: NgForm) {
    if (form.invalid) {
      //console.log('loginInput=', form.controls['loginInput']);
      if (!form.controls['loginInput'].valid) {
        this.validationMessages['loginInput'] = "Не указан логин.";
      }
      console.log('loginPassword=', form.controls['loginPassword']);
      if (!form.controls['loginPassword'].valid) {
        this.validationMessages['loginPassword'] = "Не указан пароль.";
      }
      return;
    }

    this.loading = true;
    this.auth.authenticate(this.user)     
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
}
