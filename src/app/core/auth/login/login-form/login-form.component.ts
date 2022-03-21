import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { markFormGroupTouched, regex, regexErrors } from 'app/shared';
import { loggedInUser } from 'app/shared/models/loggedInUser';
import { IUserLoginModel } from 'app/shared/models/user/user-login.model';
import { environment } from 'environments/environment';

import { ToastrService } from 'ngx-toastr';
import { debounceTime } from 'rxjs';
import { LoginService } from '../../services';
import { CookiesPolicyComponent } from '../cookies-policy/cookies-policy.component';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { PrivacyPolicyComponent } from '../privacy-policy/privacy-policy.component';

@Component({
    selector: 'canion3d-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {

    loginForm: FormGroup;
    regexErrors = regexErrors;
    externalLoginUrl = environment.socialLoginUrl;
    loginFailed: number = 0;
    private loginModel: IUserLoginModel = {
        email: '',
        password: ''
    }

    constructor(
        private fb: FormBuilder,
        private loginService: LoginService,
        private toastr: ToastrService,
        private route: Router,
        private matDialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.initLoginForm();
    }

    // Init login form
    initLoginForm() {
        this.loginForm = this.fb.group({
            email: new FormControl(
                {
                    value: '',
                    disabled: false,
                },
                {
                    validators: [
                        Validators.required,
                        Validators.pattern(regex.email),
                    ],
                }
            ),
            password: new FormControl(null, {
                validators: [Validators.required],
            }),
        });

        this.loginForm.valueChanges
            .pipe(
                debounceTime(500)
            ).subscribe(values => {
                this.loginModel = values
            })
    }

    // Submit login form
    onSubmit() {
        if (!this.loginForm.valid) {
            markFormGroupTouched(this.loginForm);
        } else {
            this.loginService
                .login(this.loginModel)
                .subscribe((response: loggedInUser) => {
                    if (response) {
                        this.route.navigate(['/admin']);
                    }
                }, error => {
                    this.loginFailed++;
                    if (this.loginFailed >= 10) {
                        this.loginService.blockAccount(this.loginForm.controls['email'].value)
                            .subscribe()
                    }                 
                });
        }
    }

    // Open external login site
    onExternalLogin() {
        window.location.href = this.externalLoginUrl;
    }

    // Forgot password flow
    onForgotPassword() {
        const forgotPasswordDialog = this.matDialog.open(
            ForgotPasswordComponent,
            {
                panelClass: 'forgot-password-dialog',
            }
        );
    }

    // Open policy page
    openPolicy() {
        const policyDialog = this.matDialog.open(PrivacyPolicyComponent, {
            panelClass: 'cookies-policy-dialog',
            autoFocus: false,
        });
    }

    // Open term page
    openTerm() {
        const termDialog = this.matDialog.open(CookiesPolicyComponent, {
            panelClass: 'cookies-policy-dialog',
            autoFocus: false,
        });
    }
}
