import { Component, OnInit } from '@angular/core';
import { LoginService } from 'app/core/auth/services';
import { RoleTypes } from 'app/shared/constants/role.constants';
import { loggedInUser } from 'app/shared/models/loggedInUser';

@Component({
    selector: 'canion3d-base-component',
    templateUrl: './base-component.component.html',
    styleUrls: ['./base-component.component.scss'],
})
export class BaseComponent implements OnInit {

    loggedInUser: loggedInUser

    constructor(
        public loginService: LoginService
    ) {
        const user: loggedInUser = JSON.parse(localStorage.getItem('user'));
        if(user){
          this.loginService.changeCurrentUserSource(user);
          this.loggedInUser = user;
        }
    }

    ngOnInit(): void {}

    get role(): RoleTypes{
        return this.loggedInUser?.role
    }

    get userId(): any{
        return this.loggedInUser?.id
    }

    get email(): string{
        return this.loggedInUser?.email
    }
}
