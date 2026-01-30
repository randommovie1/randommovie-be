export class UserCriteria {

    public id: number | undefined = undefined;
    public displayName: string | undefined = undefined;
    public credentialId: number | undefined = undefined;
    public fetch: string[] | undefined = undefined;

    constructor(object?: any) {
        if (object != null) {
            this.id = object.id;
            this.displayName = object.displayName;
            this.credentialId = object.credentialId;
            this.fetch = object.fetch;
        }
    }

}