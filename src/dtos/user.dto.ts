import {CredentialDto} from "./credential.dto";
import {MovieDto} from "./movie.dto";

export class UserDto {
    public id: number | undefined = undefined;
    public displayName: string | undefined = undefined;
    public credential: CredentialDto | undefined = undefined;
    public moviesToWatchLater: MovieDto[] | undefined = undefined;
    public ignoredMovies: MovieDto[] | undefined = undefined;

    constructor(object?: any) {
        if (object != null) {
            this.id = object.id;
            this.displayName = object.displayName;
            this.credential = object.credential != null ? new CredentialDto(object.credential) : undefined;
            this.moviesToWatchLater = object.moviesToWatchLater != null ? object.moviesToWatchLater.map(((i: any) => new MovieDto(i))) : undefined;
            this.ignoredMovies = object.ignoredMovies != null ? object.ignoredMovies.map(((i: any) => new MovieDto(i))) : undefined;
        }
    }
}