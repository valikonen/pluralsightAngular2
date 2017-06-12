import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { IUser } from './user.model';

@Injectable()

export class AuthService {
        
    currentUser:IUser;

    loginUser(userName: string, password: string){
        this.currentUser = {
            id: 1,
            userName: userName,
            firstName: 'John',
            lastName: 'Papa'
        }
    }

    isAuthenticated() {
        return !!this.currentUser;
    }
    updateCurrentUser(firstName, lastName) {
        this.currentUser.firstName = firstName;
        this.currentUser.lastName = lastName;
        // this._router.navigate(['events']);
    }

}