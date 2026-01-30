export class MovieDto {
    public external_id: number | undefined = undefined;
    public genres: { id: number, name: string }[] | undefined = undefined;
    public id: number | undefined = undefined;
    public original_title: string | undefined = undefined;
    public overview: string | undefined = undefined;
    public popularity: number | undefined = undefined;
    public poster: string | undefined = undefined;
    public poster_path: string | undefined = undefined;
    public release_date: Date | undefined = undefined;
    public runtime: number | undefined = undefined;
    public title: string | undefined = undefined;
    public vote_average: number | undefined = undefined;
    public vote_count: number | undefined = undefined;
    public watchLater: boolean | undefined = undefined;
    public production_countries: { iso_3166_1: string, name: string }[] | undefined = undefined;

    constructor(object?: any) {
        if (object != null) {
            this.external_id = object.external_id;
            this.genres = object.genres != null ? object.genres.map((i: any) => ({
                id: i.id,
                name: i.name,
            })) : undefined;
            this.id = object.id;
            this.original_title = object.original_title;
            this.overview = object.overview;
            this.popularity = object.popularity;
            this.poster = object.poster_path;
            this.poster_path = object.poster_path;
            this.release_date = object.release_date != null ? new Date(object.release_date) : undefined;
            this.runtime = object.runtime;
            this.title = object.title;
            this.vote_average = object.vote_average;
            this.vote_count = object.vote_count;
            this.watchLater = object.watchLater;
            this.production_countries = object.production_countries != null ? object.production_countries.map((i: any) => ({
                iso_3166_1: i.iso_3166_1,
                name: i.name,
            })) : undefined;
        }
    }
}