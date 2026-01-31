import {app} from "../server";
import * as TheMovieDbService from "../clients/the-movie-db.client";
import {asyncHandler} from "../configs/middleware.config";

const PATH: string = 'keyword'

export function setup(): void {
    app.get(`/${PATH}`, asyncHandler(async (req, res) => {
        const name: string = req.query.name as unknown as string;
        res.json(await TheMovieDbService.doSearchKeywords(name));
    }))
}