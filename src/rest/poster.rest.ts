import {app} from "../server";
import * as TheMovieDbService from "../services/the-movie-db.service";
import {asyncHandler} from "../configs/middleware.config";

const PATH: string = 'poster'

export function setup(): void {
    app.get(`/${PATH}`, asyncHandler(async (req, res) => {
        const path: string = req.query.path as unknown as string;
        res.json(await TheMovieDbService.getMoviePoster(path));
    }))
}