export interface IUserRegister{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    isGetPrinter: boolean;
    isReceivePromotionEmail: boolean;
    isAgreePolicy: boolean
}

export class UserRegisterModel implements IUserRegister {
    public firstName: string = '';
    public lastName: string = '';
    public email: string = '';
    public password: string = '';
    public confirmPassword: string = ''
    public isGetPrinter: boolean = false;
    public isReceivePromotionEmail: boolean = false;
    public isAgreePolicy: boolean = true;
    

    constructor(data?: IUserRegister){
        this.fromJSON(data);
    }

    fromJSON(data: IUserRegister): UserRegisterModel{
        if (!data) return this

        this.firstName = data.firstName || this.firstName;
        this.lastName = data.lastName || this.lastName;
        this.email = data.email || this.email;
        this.password = data.password || this.password;
        this.confirmPassword = data.confirmPassword || this.confirmPassword
        this.isGetPrinter = data.isGetPrinter || this.isGetPrinter;
        this.isReceivePromotionEmail = data.isReceivePromotionEmail || this.isReceivePromotionEmail;
        this.isAgreePolicy = data.isAgreePolicy || this.isAgreePolicy;

        return this
    }

    toJSON(): IUserRegister{
        return{
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            password: this.password,
            confirmPassword: this.confirmPassword,
            isAgreePolicy: this.isAgreePolicy,
            isGetPrinter: this.isGetPrinter,
            isReceivePromotionEmail: this.isReceivePromotionEmail
        }
    }    
}