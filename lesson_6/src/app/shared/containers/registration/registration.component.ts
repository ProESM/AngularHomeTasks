import { Component, OnInit, Input, AfterViewInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';

import 'rxjs/add/operator/takeWhile';

import { AuthService } from './../../services/auth.service';
import { AlertService } from '../../services/alert.service';

import { IRegistration } from './../../models/registration';

@Component({
    selector: 'registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, AfterViewInit, OnDestroy {
    private alive: boolean;

    private registration: IRegistration = {
        email: undefined,
        password: undefined,
        confirmPassword: undefined
    };

    public validationErrorMessages: { [id: string]: string } = {};

    loading = false;

    public submitted: boolean = false;

    public registrationForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private alertService: AlertService
    ) {
        this.alive = true;
    }

    ngOnInit() {
        this.registrationForm = this.formBuilder.group({
            registrationEmail: [this.registration.email, [Validators.required, Validators.email]],
            registrationPassword: [this.registration.password, [Validators.required]],
            registrationConfirmPassword: [this.registration.confirmPassword, [Validators.required, this.validatePasswordConfirmation]]
        },
        {
          validator: this.validatePasswordConfirmation
        });

        this.registrationForm.valueChanges
            .takeWhile(() => this.alive)
            .subscribe(data => {
                this.registration.email = data.registrationEmail;
                this.registration.password = data.registrationPassword;
                this.registration.confirmPassword = data.registrationConfirmPassword;
            });
    }

    ngAfterViewInit(): void {}

    validatePasswordConfirmation(group: FormGroup) {
        if (group.controls !== undefined && group.controls !== null) {
            let registrationPassword = group.controls['registrationPassword'];
            let registrationConfirmPassword = group.controls['registrationConfirmPassword'];
        
            if (registrationPassword.value !== registrationConfirmPassword.value) {
                registrationConfirmPassword.setErrors({
                    validatePasswordConfirmation: true,
                    message: 'Пароль и пароль для подтверждения не совпадают.'
                });
            } else {
                registrationConfirmPassword.setErrors(null);
            }

        }
        
        return null; 
    }

    register(event: Event): void {
        event.preventDefault();

        this.submitted = true;

        this.validationErrorMessages = {};
        if (this.registrationForm.invalid) {
          Object.keys(this.registrationForm.controls).forEach(controlName => {
            if (!this.registrationForm.controls[controlName].valid) {
              this.validationErrorMessages[controlName] = this.registrationForm.controls[controlName].errors.message;
              if (controlName === 'registrationEmail') {
                this.validationErrorMessages[controlName] = "Введите корректный email";
              };
            }
          });          
          
          return;
        }

        if (this.registrationForm.valid) {
            this.loading = true;            
            
            this.authService.register(this.registration)
                .takeWhile(() => this.alive)    
                .subscribe(
                    data => {
                        this.router.navigate(["home"]);
                    },
                    error => {
                        this.alertService.error(error);
                        this.loading = false;
                    }
                );
        }
    }

    ngOnDestroy() {
        this.alive = false;
    }
}
