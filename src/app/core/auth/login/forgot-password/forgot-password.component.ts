import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { ToastrService } from 'ngx-toastr';
import { confirmPasswordValidator, markFormGroupTouched, regex, regexErrors } from 'app/shared';
import { MatDialogRef } from '@angular/material/dialog';
import { LoginService } from '../../services';
import { debounceTime } from 'rxjs';
import { ConfirmForgotPassword, IForgotPasswordModel } from 'app/shared/models/auth.model';

@Component({
    selector: 'canion3d-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
    
    @ViewChild('stepper') stepper: MatStepper;

    emailForm: FormGroup;
    codeForm: FormGroup;
    changePassForm: FormGroup;
    email: string = ''
    regexErrors = regexErrors;
    sendEmailTextButton: string = 'Send Code'
    private forgotPassword: IForgotPasswordModel = {
        email: ''
    }
    private confirmForgotPasswordModel: ConfirmForgotPassword = new ConfirmForgotPassword()

    constructor(
        private fb: FormBuilder,
        private loginService: LoginService,
        private toastr: ToastrService,
        private dialogRef: MatDialogRef<ForgotPasswordComponent>
    ) {}

    ngOnInit(): void {
        this.initEmailForm()
        this.initChangePassForm()
        this.initCodeForm()
    }

    nextStep(stepper: MatStepper){
        stepper.next()
    }

    initEmailForm(){
        this.emailForm = this.fb.group({
            email: new FormControl('', {
                validators: [
                    Validators.required,
                    Validators.pattern(regex.email)
                ]
            }),            
        })

        this.emailForm.valueChanges
            .pipe(
                debounceTime(500)
            ).subscribe(values => {
                this.forgotPassword = values
            })
    }

    initCodeForm(){
        this.codeForm = this.fb.group({
            code: new FormControl('', {
                validators: [
                    Validators.required,
                    Validators.pattern(regex.numbers)
                ]
            }),
        })
    }

    initChangePassForm(){
        this.changePassForm = this.fb.group({
            code: new FormControl(null),
            newPassword: new FormControl('', {
                validators: [
                    Validators.required,
                    Validators.minLength(8),
                    Validators.pattern(regex.password),
                    Validators.maxLength(40)
                ]
            }),
            confirmPass: new FormControl('', {
                validators: [
                    Validators.required
                ]
            }),
            email: new FormControl(
                this.email, []
            )
        },
        {
            validators: [confirmPasswordValidator('newPassword', 'confirmPass')]
        })
    }

    onEmailSent(){
        if (!this.emailForm.valid) {
            markFormGroupTouched(this.emailForm)
        }else{
            this.sendEmailTextButton = 'Resend'
            this.loginService.forgotPassword(this.forgotPassword).subscribe(
                response => {
                    this.toastr.success("Email has been send")
                }
            )
        }        
    }

    onCodeForm(){
        if (this.codeForm.valid && this.emailForm.valid) {
            this.stepper.next();            
        }else{
            markFormGroupTouched(this.codeForm);
            markFormGroupTouched(this.emailForm);
        }
    }

    onChangePassword(){
        this.changePassForm.get('email').setValue(this.emailForm.get('email').value)
        this.changePassForm.get('code').setValue(this.codeForm.get('code').value)
        const confirmForgotPassword = this.confirmForgotPasswordModel.fromJson(this.changePassForm.getRawValue())
        this.loginService.confirmForgotPassword(confirmForgotPassword.toJSON())
            .subscribe(res => {
                this.toastr.success("Change Password Successfully");
                this.dialogRef.close();
            })
    }
}
