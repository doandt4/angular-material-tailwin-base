import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'canion3d-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {

    constructor(
        private router: Router,
    ) {
        this.router.navigate(['/admin/dashboard'])
    }

    ngOnInit(): void {}
}
