export class CredentialDto {

    public email: string | undefined = undefined;

    constructor(object?: any) {
        if (object != null) {
            this.email = object.email;
        }
    }

}