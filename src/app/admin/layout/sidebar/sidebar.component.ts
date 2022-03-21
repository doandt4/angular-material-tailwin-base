import { Component, OnInit } from '@angular/core';
import { LoginService } from 'app/core/auth/services';
import { BaseComponent } from 'app/shared/components/base-component/base-component.component';

@Component({
    selector: 'canion3d-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent extends BaseComponent implements OnInit {
    isAdmin: boolean = false;

    constructor(loginService: LoginService) {
        super(loginService);
    }

    ngOnInit(): void {
        //this.buildListSidebar()
    }

    // buildListSidebar(){
    //     if (this.role === 'admin') {
    //         this.isAdmin = true
    //     }
    // }
}
