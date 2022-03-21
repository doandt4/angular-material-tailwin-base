import {
    Component,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginService } from 'app/core/auth/services';
import { BaseComponent } from 'app/shared/components/base-component/base-component.component';
import { loggedInUser } from 'app/shared/models/loggedInUser';

@Component({
    selector: 'canion3d-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent extends BaseComponent implements OnInit {
    loggedInUser: loggedInUser;
    currentUserMessage: string;

    constructor(
        loginService: LoginService,
        private route: Router,
        private matDialog: MatDialog
    ) {
        super(loginService);
    }

    ngOnInit() {
        this.loginService.currentUser$.subscribe((userLoggedIn) => {
            this.loggedInUser = userLoggedIn;
        });

        // this.presenceService.getMessage().subscribe((status: any) => {
        //     this.currentUserMessage = status?.message;
        // });

        // this.getCurrentMessage();
    }

    // Logout
    logout() {
        localStorage.removeItem('user');
        this.loginService.logout(this.userId).subscribe();
        this.route.navigate(['/']);
    }

    // Open setting dialog
    setting() {}

    // Open setting user status
    setStatus() {}

    displayStatus(statusName: string): any {
        switch (statusName) {
            case 'do_not_disturb':
                return {
                    text: 'Do Not Disturb',
                    value: 'do_not_disturb',
                    icon: 'do_not_disturb_on',
                    cls: 'text-red-600 ',
                    description: 'Mute all notifications',
                };
                break;
            case 'away':
                return {
                    text: 'Away',
                    value: 'away',
                    icon: 'dark_mode',
                    cls: 'text-yellow-600',
                    description: '',
                };
                break;
            case 'invisible':
                return {
                    text: 'Invisible',
                    value: 'invisible',
                    icon: 'radio_button_unchecked',
                    cls: '',
                    description: 'Appear online',
                };
                break;
            default:
                return {
                    text: 'Online',
                    value: 'online',
                    icon: 'circle',
                    cls: 'text-green-500',
                    description: '',
                };
        }
    }

    getCurrentMessage() {}
}
