export class TokenDto {

    public uuid: string | undefined = undefined;

    constructor(object?: any) {
        if (object != null) {
            this.uuid = object.uuid;
        }
    }
}