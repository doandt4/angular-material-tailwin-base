import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { LoginService } from './core/auth/services';
import { BaseComponent } from './shared/components/base-component/base-component.component';
import { LogoutDialogComponent } from './shared/components/logout-dialog/logout-dialog.component';
import { loggedInUser } from './shared/models/loggedInUser';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent extends BaseComponent implements OnInit {
    userActivity;

    userStatus: any;

    userInactive: Subject<any> = new Subject();

    constructor(
        private matDialog: MatDialog,
        private route: Router,
        loginService: LoginService
    ) {
        super(loginService);
        this.setTimeout();

        // Announce for user need log back in
        this.userInactive.subscribe(() => {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user) {
                const logoutDialog = this.matDialog.open(
                    LogoutDialogComponent,
                    {
                        panelClass: 'verify-email-dialog',
                    }
                );

                logoutDialog.afterClosed().subscribe((result) => {
                    loginService.logout(this.userId).subscribe();
                    localStorage.removeItem('user');
                    this.matDialog.closeAll();
                    this.route.navigate(['/']);
                });

                // TODO
                // this.userStatus = {
                //     status_name: 'away',
                //     userId: this.userId,
                // };
                // this.presenceService.updateStatus(this.userStatus);
            }
        });
    }
    ngOnInit(): void {
        super.ngOnInit();
    }

    setTimeout() {
        this.userActivity = setTimeout(
            () => this.userInactive.next(undefined),
            600000
        );
    }

    @HostListener('window:mousemove') refreshUserState() {
        clearTimeout(this.userActivity);
        this.setTimeout();

        // TODO
        // this.presenceService.getStatus().subscribe((status: any) => {
        //     if (status.status_name === 'away') {
        //         this.userStatus = {
        //             status_name: 'online',
        //             userId: this.userId,
        //         };
        //         this.presenceService.updateStatus(this.userStatus);
        //     }
        // });
    }

    // Set current user logged in
}
