import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {

    constructor(
        private _router: Router,
        private _toastr: ToastrService
    ){}
    
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ) {
        if (localStorage.getItem('user')) {
            return true;
        }
        this._router.navigate(['/']);
        this._toastr.error('You shall not pass');
        return false;
    }
}
