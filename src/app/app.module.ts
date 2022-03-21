import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingInterceptor } from './core/interceptors/loading.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { AuthGuard } from './core/guards/auth.guard';
import { MaterialModule } from './shared/material.module';
import { LogoutDialogComponent } from './shared/components/logout-dialog/logout-dialog.component';
import { NgChartsModule } from 'ng2-charts';

export function getUser() {
    return localStorage.getItem('user');
}


@NgModule({
    declarations: [
        AppComponent, 
        LogoutDialogComponent,        
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        NgxSpinnerModule,
        ToastrModule.forRoot({
            positionClass: 'toast-top-center',
        }),
        MaterialModule,
        NgChartsModule,
    ],
    providers: [
        AuthGuard,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: LoadingInterceptor,
            multi: true,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
