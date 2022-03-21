import { Injectable } from '@angular/core';
import { CustomSocket } from 'app/core/sockets/custom-socket';
import { CurrentStatus, UserStatus } from 'app/shared/models/userStatus';

@Injectable({
    providedIn: 'root',
})
export class PresenceService {

    constructor(private socket: CustomSocket) {
        
    }

    getUser(){
        return this.socket.fromEvent('users')
    }

    updateStatus(userStatus: UserStatus){
        return this.socket.emit('set_user_status', userStatus)
    }

    getStatus(){
        return this.socket.fromEvent('set_user_status');
    }

    getMessage(){
        return this.socket.fromEvent('get_one_message');
    }

    setStatus(currentStatus: CurrentStatus){
        return this.socket.emit('get_one_message', currentStatus)
    }
}
