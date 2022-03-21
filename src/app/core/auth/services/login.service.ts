
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IChangePasswordModel, IConfirmForgotPassword, IForgotPasswordModel, IVerifyEmailModel } from 'app/shared/models/auth.model';
import { loggedInUser } from 'app/shared/models/loggedInUser';
import { IUserLoginModel } from 'app/shared/models/user/user-login.model';
import { IUserRegister } from 'app/shared/models/user/user-register.model';
import { environment } from 'environments/environment';
import { Observable, ReplaySubject } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class LoginService {

    private apiUrl: string = `${environment.apiUrl}/user`
    private currentUserSource = new ReplaySubject<loggedInUser>(1);
    currentUser$ = this.currentUserSource.asObservable();

    constructor(
        private http: HttpClient,        
    ) {}

    register(data: IUserRegister){
        return this.http.post(this.apiUrl + '/register', data)            
    }

    login(data: IUserLoginModel): Observable<loggedInUser>{
        return this.http.post<loggedInUser>(this.apiUrl + '/signin', data).pipe(
            map((response: loggedInUser) =>{
                if (response) {
                  this.changeCurrentUserSource(response)
                }
                return response
            }))
    }

    logout(userId: string){ 
        const data = {
            userId: userId
        }       
        this.currentUserSource.next(null);
        return this.http.post(this.apiUrl + '/logout', data)
    }

    verifyEmail(data: IVerifyEmailModel){
        return this.http.post(this.apiUrl + '/verify-email', data)
    }

    forgotPassword(data: IForgotPasswordModel){
        return this.http.post(this.apiUrl + '/forgot-password', data)
    }

    changePassword(data: IChangePasswordModel){
        return this.http.post(this.apiUrl + '/change-password', data)
    }

    confirmForgotPassword(data: IConfirmForgotPassword){
        return this.http.post(this.apiUrl + '/confirm-password', data)
    }

    sendToken(accessToken: string, idToken: string){
        const data = {
            "accessToken": accessToken,
            "idToken": idToken
        }
        return this.http.post<loggedInUser>(this.apiUrl + '/login/social', data)
    }

    changeCurrentUserSource(loggedInUser: loggedInUser){
        localStorage.setItem('user', JSON.stringify(loggedInUser));
        this.currentUserSource.next(loggedInUser);
    }

    async getLoggedInUser(): Promise<loggedInUser>{
        return new Promise((resolve, reject) => {
            this.currentUser$
                .pipe(take(1))
                .subscribe(userLoggedIn => {                
                    resolve(userLoggedIn)
                })
        })
    }

    blockAccount(email: string){
        const data = {
            "email": email
        }
        return this.http.post(this.apiUrl + '/block-account', data)
    }
}
