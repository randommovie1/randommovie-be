export class TheMovieDbMovie {
    public adult: boolean | undefined = undefined;
    public backdrop_path: string | undefined = undefined;
    public genres: { id: number, name: string }[] | undefined = undefined;
    public id: number | undefined = undefined;
    public origin_country: string[] | undefined = undefined;
    public original_title: string | undefined = undefined;
    public overview: string | undefined = undefined;
    public popularity: number | undefined = undefined;
    public poster_path: string | undefined = undefined;
    public release_date: Date | undefined = undefined;
    public runtime: number | undefined = undefined;
    public title: string | undefined = undefined;
    public video: boolean | undefined = undefined;
    public vote_average: number | undefined = undefined;
    public vote_count: number | undefined = undefined;
    public production_countries: { iso_3166_1: string, name: string }[] | undefined = undefined;

    constructor(object?: any) {
        if (object != null) {
            this.adult = object.adult;
            this.backdrop_path = object.backdrop_path;
            this.genres = object.genres != null ? object.genres.map((i: any) => ({
                id: i.id,
                name: i.name,
            })) : undefined;
            this.id = object.id;
            this.origin_country = object.origin_country ?? undefined;
            this.original_title = object.original_title;
            this.overview = object.overview;
            this.popularity = object.popularity;
            this.poster_path = object.poster_path;
            this.release_date = object.release_date != null ? new Date(object.release_date) : undefined;
            this.runtime = object.runtime;
            this.title = object.title;
            this.video = object.video;
            this.vote_average = object.vote_average;
            this.vote_count = object.vote_count;
            this.production_countries = object.production_countries != null ? object.production_countries.map((i: any) => ({
                iso_3166_1: i.iso_3166_1,
                name: i.name
            })) : undefined;
        }
    }

}