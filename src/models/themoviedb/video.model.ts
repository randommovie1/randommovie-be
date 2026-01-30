export class Video {
    public iso_639_1: string | undefined = undefined;
    public iso_3166_1: string | undefined = undefined;
    public name: string | undefined = undefined;
    public key: string | undefined = undefined;
    public site: string | undefined = undefined;
    public size: number | undefined = undefined;
    public type: string | undefined = undefined;
    public official: boolean | undefined = undefined;
    public published_at: Date | undefined = undefined;
    public id: string | undefined = undefined;

    constructor(obj: any) {
        if (obj != null) {
            this.iso_639_1 = obj.iso_639_1;
            this.iso_3166_1 = obj.iso_3166_1;
            this.name = obj.name;
            this.key = obj.key;
            this.site = obj.site;
            this.size = obj.size;
            this.type = obj.type;
            this.official = obj.official;
            this.published_at = obj.published_at != null ? new Date(obj.published_at) : undefined;
            this.id = obj.id;
        }
    }

}