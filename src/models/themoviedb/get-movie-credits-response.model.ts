import { Person } from '../person.model';

export class GetMovieCreditsResponse {
    public id: number | undefined = undefined;
    public cast: Person[] = [];
    public crew: Person[] = [];

    constructor(object?: any) {
        if (object != null) {
            this.id = object.id;
            this.cast = object.cast != null ? object.cast.map((i: any) => new Person(i)) : [];
            this.crew = object.crew != null ? object.crew.map((i: any) => new Person(i)) : [];
        }
    }
}