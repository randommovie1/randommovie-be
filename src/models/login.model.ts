export class Login {

    public email: string | undefined = undefined;
    public password: string | undefined = undefined;

    constructor(object?: any) {
        if (object != null) {
            this.email = object.email;
            this.password = object.password;
        }
    }

}