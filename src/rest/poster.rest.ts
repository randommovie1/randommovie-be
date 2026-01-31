import {app} from "../server";
import * as TheMovieDbService from "../clients/the-movie-db.client";
import {asyncHandler} from "../configs/middleware.config";

const PATH: string = 'poster'

export function setup(): void {
    app.get(`/${PATH}`, asyncHandler(async (req, res) => {
        const path: string = req.query.path as unknown as string;
        res.json(await TheMovieDbService.getMoviePoster(path));
    }))
}