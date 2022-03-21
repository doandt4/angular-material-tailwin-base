import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../services';
import { loggedInUser } from 'app/shared/models/loggedInUser';

@Component({
    selector: 'canion3d-callback',
    templateUrl: './callback.component.html',
    styleUrls: ['./callback.component.scss'],
})
export class CallbackComponent implements OnInit {
    constructor(
        private loginService: LoginService,
        private route: ActivatedRoute,        
        private router: Router,
        private toastr: ToastrService,
    ) {}

    ngOnInit(): void {
        this.route.fragment
        .pipe(
            map(fragment => new URLSearchParams(fragment)),
            map(params => ({
                access_token: params.get('access_token'),
                id_token: params.get('id_token'),
                error: params.get('error'),
                error_description: params.get('error_description'),
            }))
        )
        .subscribe(res => {
            this.loginService.sendToken(res.access_token, res.id_token)
                .subscribe((response: loggedInUser) => {
                    if (response) {
                        this.loginService.changeCurrentUserSource(response)
                        this.router.navigate(['/admin'])
                    }
                })
        });
    }
}
