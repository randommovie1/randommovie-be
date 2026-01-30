export class TokenCriteria {

    public id: number | undefined = undefined;
    public uuid: string | undefined = undefined;
    public consumed: boolean | undefined = undefined;

    constructor(object?: any) {
        if (object != null) {
            this.id = object.id;
            this.uuid = object.uuid;
            this.consumed = object.consumed;
        }
    }

}