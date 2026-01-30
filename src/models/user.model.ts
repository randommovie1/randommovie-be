import {Credential} from "./credential.model";
import {numberToBoolean} from "../utils/boolean.utils";
import {Movie} from "./movie.model";

export class User {

    public id: number | undefined = undefined;
    public displayName: string | undefined = undefined;
    public credential: Credential | undefined = undefined;
    public insertDatetime: Date | undefined = undefined;
    public deleted: boolean | undefined = undefined;
    public moviesToWatchLater: Movie[] | undefined = undefined;
    public ignoredMovies: Movie[] | undefined = undefined;

    constructor(object?: any) {
        if (object != null) {
            this.id = object.id;
            this.displayName = object.displayName;
            this.credential = object.credential != null ? new Credential(object.credential) : undefined;
            this.insertDatetime = object.insertDatetime != null ? new Date(object.insertDatetime) : undefined;
            this.deleted = numberToBoolean(object.deleted);
            this.moviesToWatchLater = object.moviesToWatchLater != null ? object.moviesToWatchLater.map(((i: any) => new Movie(i))) : undefined;
            this.ignoredMovies = object.ignoredMovies != null ? object.ignoredMovies.map(((i: any) => new Movie(i))) : undefined;
        }
    }

    public static fromResultSet(rs: any): User {
        return new User({
            id: rs['id'],
            displayName: rs['display_name'],
            credential: {
                id: rs['credential_id']
            },
            insertDatetime: rs['insert_datetime'],
            deleted: rs['deleted'],
        });
    }

}