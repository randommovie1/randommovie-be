import {Token} from "./token.model";
import {numberToBoolean} from "../utils/boolean.utils";

export class Credential {

    public id: number | undefined = undefined;
    public email: string | undefined = undefined;
    public password: string | undefined = undefined;
    public token: Token | undefined = undefined;
    public enabled: boolean | undefined = undefined;

    constructor(object?: any) {
        if (object != null) {
            this.id = object.id;
            this.email = object.email;
            this.password = object.password;
            this.token = object.token != null ? new Token(object.token) : undefined;
            this.enabled = numberToBoolean(object.enabled);
        }
    }

    static fromResultSet(rs: any): Credential {
        return new Credential({
            id: rs['id'],
            email: rs['email'],
            password: rs['password'],
            token: {
                id: rs['id']
            },
            enabled: rs['enabled']
        });
    }

}