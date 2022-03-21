import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from 'app/shared/material.module';
import { LoginFormComponent } from './login/login-form/login-form.component';
import { RegisterFormComponent } from './login/register-form/register-form.component';
import { ControlsModule } from 'app/shared/controls/controls.module';
import { FormFieldModule } from 'app/shared/controls/form-field/form-field.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { VerifyEmailComponent } from './login/verify-email/verify-email.component';
import { CallbackComponent } from './login/callback/callback.component';
import { ForgotPasswordComponent } from './login/forgot-password/forgot-password.component';
import { CheckboxModule } from 'app/shared';
import { CookiesPolicyComponent } from './login/cookies-policy/cookies-policy.component';
import { PrivacyPolicyComponent } from './login/privacy-policy/privacy-policy.component';

@NgModule({
    declarations: [
        LoginComponent,
        LoginFormComponent,
        RegisterFormComponent,
        VerifyEmailComponent,
        CallbackComponent,
        ForgotPasswordComponent,
        CookiesPolicyComponent,
        PrivacyPolicyComponent,
    ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        MaterialModule,
        ControlsModule,
        FormFieldModule,
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule,
        CheckboxModule,
    ],
})
export class AuthModule {}
