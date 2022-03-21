import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { markFormGroupTouched } from 'app/shared';

@Component({
    selector: 'canion3d-cookies-policy',
    templateUrl: './cookies-policy.component.html',
    styleUrls: ['./cookies-policy.component.scss'],
})
export class CookiesPolicyComponent implements OnInit {

    panelOpenState = false;
    cookiesForm: FormGroup

    constructor(
        public dialogRef: MatDialogRef<CookiesPolicyComponent>,
        private fb: FormBuilder
    ) {}

    ngOnInit(): void {
        this.initCookiesForm()
        
        this.dialogRef.disableClose = true        
    }



    onOkButton() {
        this.dialogRef.close();
    }

    initCookiesForm(){
        this.cookiesForm = this.fb.group({
            acceptMandatory: new FormControl(true, {
                validators: [Validators.requiredTrue]
            }),
            rejectCookies: new FormControl(false)
        })
    }

    onAcceptCookie(){
        if (!this.cookiesForm.valid) {
            markFormGroupTouched(this.cookiesForm)
        }else{
            this.dialogRef.close()
        }
    }
}
