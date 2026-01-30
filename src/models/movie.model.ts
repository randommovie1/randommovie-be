export class Movie {

    public externalId: number | undefined = undefined;
    public id: number | undefined = undefined;
    public originalTitle: string | undefined = undefined;
    public poster: string | undefined = undefined;
    public posterPath: string | undefined = undefined;
    public title: string | undefined = undefined;
    public watchLater: boolean | undefined = undefined;
    public ignored: boolean | undefined = undefined;

    constructor(object?: any) {
        if (object != null) {
            this.externalId = object.externalId;
            this.id = object.id;
            this.originalTitle = object.originalTitle;
            this.poster = object.poster;
            this.posterPath = object.posterPath;
            this.title = object.title;
            this.watchLater = object.watchLater;
            this.ignored = object.ignored;
        }
    }

    public static fromResultSet(rs: any): Movie {
        return new Movie({
            externalId: rs['external_id'],
            id: rs['id'],
            originalTitle: rs['original_path'],
            posterPath: rs['poster_path'],
            title: rs['title'],
        });
    }


}