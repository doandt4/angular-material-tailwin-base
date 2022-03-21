import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'canion3d-privacy-policy',
    templateUrl: './privacy-policy.component.html',
    styleUrls: ['./privacy-policy.component.scss'],
})
export class PrivacyPolicyComponent implements OnInit {

    constructor(
        private matDialogRef: MatDialogRef<PrivacyPolicyComponent>
    ) {}

    ngOnInit(): void {}

    onOkButton() {
        this.matDialogRef.close()
    }
}
