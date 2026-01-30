export class CredentialCriteria {

    public id: number | undefined = undefined;
    public email: string | undefined = undefined;
    public password: string | undefined = undefined;
    public tokenId: number | undefined = undefined;
    public enabled: boolean | undefined = undefined;
    public fetch: string[] | undefined = undefined;

    constructor(object?: any) {
        if (object != null) {
            this.id = object.id;
            this.email = object.email;
            this.password = object.password;
            this.tokenId = object.tokenId;
            this.enabled = object.enabled;
            this.fetch = object.fetch;
        }
    }

}