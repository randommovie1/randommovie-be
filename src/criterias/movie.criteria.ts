export class MovieCriteria {
    public id: number | undefined = undefined;
    public ids: number[] | undefined = undefined;
    public externalId: number | undefined = undefined;
    public title: string | undefined = undefined;
    public originalTitle: string | undefined = undefined;
    public backdropPath: string | undefined = undefined;
    public fetch: string[] | undefined = undefined;

    constructor(object?: any) {
        if (object != null) {
            this.id = object.id;
            this.ids = object.ids != null ? object.ids.map((i: number) => i) : undefined;
            this.externalId = object.external_id;
            this.title = object.title;
            this.originalTitle = object.original_title;
            this.backdropPath = object.backdrop_path;
            this.fetch = object.fetch;
        }
    }

}