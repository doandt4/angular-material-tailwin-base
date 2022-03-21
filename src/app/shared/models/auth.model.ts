export interface IForgotPasswordModel {
    email: string;
}

export interface IVerifyEmailModel extends IForgotPasswordModel {
    code: string;
}

export interface IConfirmForgotPassword extends IForgotPasswordModel, IVerifyEmailModel{
    newPassword: string
}

export interface IChangePasswordModel extends IForgotPasswordModel {
    oldPassword: string;
    newPassword: string;
    password: string
}

export class ChangePasswordModel implements IChangePasswordModel {
    oldPassword: string;
    newPassword: string;
    email: string;

    constructor(data?: IChangePasswordModel){
        this.fromJson(data)
    }

    fromJson(data: IChangePasswordModel): ChangePasswordModel{
        if (!data) return this

        this.oldPassword = data.oldPassword || this.oldPassword || '';
        this.newPassword = data.newPassword || this.newPassword || '';
        this.email = data.email || this.email || '';

        return this
    }

    get password(): string{
        return this.oldPassword
    }

    toJSON(): IChangePasswordModel{
        return{
            oldPassword: this.oldPassword,
            newPassword: this.newPassword,
            email: this.email,
            password: this.password
        }
    }
}

export class ConfirmForgotPassword implements IConfirmForgotPassword {

    newPassword: string;
    email: string;
    code: string;

    constructor(data?: IConfirmForgotPassword){
        this.fromJson(data)
    }

    fromJson(data: IConfirmForgotPassword): ConfirmForgotPassword{
        if (!data) return this

        this.code = data.code || this.code || '';
        this.newPassword = data.newPassword || this.newPassword || '';
        this.email = data.email || this.email || '';

        return this
    }

    toJSON(): IConfirmForgotPassword{
        return{
            newPassword: this.newPassword,
            email: this.email,
            code: this.code
        }
    }

}

