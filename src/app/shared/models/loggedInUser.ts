import { RoleTypes } from '../constants/role.constants';
import { IDateTracking } from './date-tracking.model';
import { IUserProfile } from './user/user-profile.model';
import { UserAvatar } from './userAvatar';
import { UserStatus } from './userStatus';

export interface loggedInUser extends IDateTracking {
    avatar: UserAvatar;
    email: string;
    firstName: string;
    id: string;
    isAgreePolicy: true;
    isConfirmedEmail: true;
    isGetPrinter: false;
    isReceivePromotionEmail: false;
    lastName: string;
    profile: IUserProfile;
    role: RoleTypes;
    status: UserStatus;
    type: string;
    userSub?: string
}
