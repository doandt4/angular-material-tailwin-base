import { IDateTracking } from "../date-tracking.model";

export interface IUserProfile extends IDateTracking {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    id: string
    location: string;
    
    
}

export class UserProfileModel implements IUserProfile {
    address: string;
    firstName: string;
    id: string;
    lastName: string;
    location: string;
    phone: string;
    email: string;
    createdAt?: Date;
    updatedAt?: Date;

    constructor(data?: IUserProfile){
        this.fromJSON(data)
    }
    

    fromJSON(data: IUserProfile) {
        if (!data) return this;

        this.address = data.address || this.address || '';
        this.id = data.id || this.id || '';
        this.location = data.location || this.location || '';
        this.phone = data.phone || this.phone || '';
        this.firstName = data.firstName || this.firstName || '';
        this.lastName = data.lastName || this.lastName || '';
        this.location = data.location || this.location || '';
        this.email = data.email || this.email || '';
        


        return this;
    }

    toJSON(): IUserProfile{
        return{
            address: this.address,
            firstName: this.firstName,
            id: this.id,
            lastName: this.lastName,
            location: this.location,
            phone: this.phone,
            email: this.email
        }
    }

}
