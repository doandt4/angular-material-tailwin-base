
import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { BusyService } from 'app/shared/services/busy.service';
import { finalize } from 'rxjs/operators';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
    constructor(
        private busyService: BusyService
    ) {}

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        this.busyService.busy();
        return next.handle(request)
        .pipe(
            finalize(() => {
              this.busyService.idle();
            })
          )
    }
}
