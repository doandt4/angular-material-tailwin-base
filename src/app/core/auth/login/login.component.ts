import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { loggedInUser } from 'app/shared/models/loggedInUser';
import { map } from 'rxjs/operators';
import { LoginService } from '../services';
import { CookiesPolicyComponent } from './cookies-policy/cookies-policy.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    constructor(
        private matDialog: MatDialog,
        private router: Router,
        private route: ActivatedRoute,
        private loginService: LoginService
    ) {}

    ngOnInit(): void {
        const cookiesPolicy = this.matDialog.open(CookiesPolicyComponent, {
            panelClass: 'cookies-policy-dialog',
            autoFocus: false,
        });

        this.route.fragment
            .pipe(
                map((fragment) => new URLSearchParams(fragment)),
                map((params) => ({
                    access_token: params.get('access_token'),
                    id_token: params.get('id_token'),
                    error: params.get('error'),
                    error_description: params.get('error_description'),
                }))
            )
            .subscribe((res) => {
                if (res.access_token && res.id_token) {
                    this.loginService
                        .sendToken(res.access_token, res.id_token)
                        .subscribe((response: loggedInUser) => {
                            if (response) {
                                this.loginService.changeCurrentUserSource(
                                    response
                                );
                                this.router.navigate(['/admin']);
                            }
                        });
                }
            });
    }
}
