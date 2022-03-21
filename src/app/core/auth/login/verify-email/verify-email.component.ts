import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IVerifyEmailModel } from 'app/shared/models/auth.model';
import { ToastrService } from 'ngx-toastr';
import { debounceTime } from 'rxjs';
import { LoginService } from '../../services/login.service';

@Component({
    selector: 'canion3d-verify-email',
    templateUrl: './verify-email.component.html',
    styleUrls: ['./verify-email.component.scss'],
})
export class VerifyEmailComponent implements OnInit {

    verifyForm: FormGroup;
    private verifyModel: IVerifyEmailModel = {
        email: '',
        code: ''
    }


    constructor(
        public dialogRef: MatDialogRef<VerifyEmailComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private fb: FormBuilder,
        private loginService: LoginService,
        private toastr: ToastrService
    ) {}

    ngOnInit(): void {
        this.initVerifyForm()
    }

    onSubmit(): void {
        this.loginService.verifyEmail(this.verifyModel)
            .subscribe(response => {
                this.toastr.success("Register successfully")
                this.dialogRef.close()
            })
    }

    initVerifyForm(){
        this.verifyForm = this.fb.group({
            email: new FormControl(this.data.result.response.email, []),
            code: new FormControl('', {
                validators: [
                    Validators.required
                ]
            })
        })

        this.verifyForm.valueChanges
            .pipe(
                debounceTime(500)
            ).subscribe(values => {
                this.verifyModel = values
            })
    }
}
