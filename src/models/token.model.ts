import {numberToBoolean} from "../utils/boolean.utils";

export class Token {

    public id: number | undefined = undefined;
    public uuid: string | undefined = undefined;
    public insertDatetime: Date | undefined = undefined;
    public consumed: boolean | undefined = undefined;
    public consumedDatetime: Date | undefined = undefined;

    constructor(object?: any) {
        if (object != null) {
            this.id = object.id;
            this.uuid = object.uuid;
            this.insertDatetime = object.insertDatetime != null ? new Date(object.insertDatetime) : undefined;
            this.consumed = numberToBoolean(object.consumed);
            this.consumedDatetime = object.consumedDatetime != null ? new Date(object.consumedDatetime) : undefined;
        }
    }

    static fromResultSet(rs: any): Token {
        return new Token({
            id: rs['id'],
            uuid: rs['uuid'],
            insertDatetime: rs['insertDatetime'],
            consumed: rs['consumed'],
            consumedDatetime: rs['consumedDatetime']
        });
    }
}
