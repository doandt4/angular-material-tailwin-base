import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoutDialogModule } from './logout-dialog/logout-dialog.module';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        LogoutDialogModule
    ],
    exports: [
        LogoutDialogModule
    ]
})
export class SharedComponentsModule {}
