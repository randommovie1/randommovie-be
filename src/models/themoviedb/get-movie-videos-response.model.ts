import {Video} from "./video.model";

export class GetMovieVideosResponse {
    public id: number | undefined = undefined;
    public results: Video[] | undefined = undefined;

    constructor(obj: any) {
        if (obj != null) {
            this.id = obj.id;
            this.results = obj.results != null ? obj.results.map((i: any) => new Video(i)) : undefined;
        }
    }
}