import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private toastr: ToastrService
    ) {}

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError((error) => {
                if (error) {
                    if (error.status === 400) {
                        if (error.error.errors) {
                            throw error.error;
                        } else {
                            this.toastr.error(
                                error.error.message,
                            );
                        }
                    }
                    if (error.status === 401) {
                        this.toastr.error(
                            error.error.message,
                        );
                    }
                    if (error.status === 404) {
                        this.toastr.error(
                            error.error.message,
                        );
                    }
                    if (error.status === 500) {
                        this.toastr.error(
                            error.error.message,
                        );
                    }
                    if (error.status === 403){
                        this.toastr.error(
                            error.error.message,
                        );
                    }
                }

                return throwError(error);
            })
        );
    }
}
