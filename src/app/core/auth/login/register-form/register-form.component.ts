import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {
    confirmPasswordValidator,
    markFormGroupTouched,
    regex,
    regexErrors,
} from 'app/shared';
import { UserRegisterModel } from 'app/shared/models/user/user-register.model';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../services/login.service';
import { CookiesPolicyComponent } from '../cookies-policy/cookies-policy.component';
import { PrivacyPolicyComponent } from '../privacy-policy/privacy-policy.component';
import { VerifyEmailComponent } from '../verify-email/verify-email.component';

@Component({
    selector: 'canion3d-register-form',
    templateUrl: './register-form.component.html',
    styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent implements OnInit {
    registerForm: FormGroup;
    regexErrors = regexErrors;
    private userRegisterModel: UserRegisterModel = new UserRegisterModel()

    constructor(
        private fb: FormBuilder,
        private loginService: LoginService,
        private toastr: ToastrService,
        private matDialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.initRegisterForm();
    }

    // Init register form
    initRegisterForm() {
        this.registerForm = this.fb.group(
            {
                firstName: new FormControl(
                    {
                        value: '',
                        disabled: false,
                    },
                    {
                        validators: [
                            Validators.required,
                            Validators.minLength(2),
                            Validators.maxLength(255),
                        ],
                    }
                ),
                lastName: new FormControl(null, {
                    validators: [
                        Validators.required,
                        Validators.minLength(2),
                        Validators.maxLength(255),
                    ],
                }),
                email: new FormControl(null, {
                    validators: [
                        Validators.required,
                        Validators.pattern(regex.email),
                    ],
                }),
                password: new FormControl(null, {
                    validators: [
                        Validators.required,
                        Validators.minLength(8),
                        Validators.pattern(regex.password),
                        Validators.maxLength(40)
                    ],
                }),
                confirmPassword: new FormControl(null, {
                    validators: [Validators.required],
                }),
                isGetPrinter: new FormControl(false),
                isReceivePromotionEmail: new FormControl(false),
                isAgreePolicy: new FormControl(true, {
                    validators: [Validators.requiredTrue],
                }),
            },
            {
                validators: [
                    confirmPasswordValidator('password', 'confirmPassword'),
                ],
            }
        );
    }

    // Submit register form
    onSubmitForm() {
        if (!this.registerForm.valid) {
            markFormGroupTouched(this.registerForm);
        } else {
            const userRegister = this.userRegisterModel.fromJSON(this.registerForm.getRawValue())
            this.loginService
                .register(userRegister.toJSON())
                .subscribe((result) => {
                    const confirmDialog = this.matDialog.open(
                        VerifyEmailComponent,
                        {
                            panelClass: 'verify-email-dialog',
                            data: {
                                result: result,
                            },
                        }
                    );
                });
        }
    }

    OpenTermCondition() {
        const cookiesPolicy = this.matDialog.open(PrivacyPolicyComponent, {
            panelClass: 'privacy-policy-dialog',
            autoFocus: false,
        });
    }
}
