
import { Injectable } from '@angular/core';
import { getUser } from 'app/app.module';
import { environment } from 'environments/environment';
import { Socket, SocketIoConfig } from 'ngx-socket-io';

const config: SocketIoConfig = {
    url: environment.socketUrl,

    options: {
        transportOptions: {
            polling: {
                extraHeaders: {
                    Authorization: getUser(),
                },
            },
        },
    },
};

@Injectable({ providedIn: 'root' })
export class CustomSocket extends Socket {
    constructor() {
        super(config);
    }
}
