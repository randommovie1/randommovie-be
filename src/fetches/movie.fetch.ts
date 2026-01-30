import {FetchInterface} from "./fetch.interface";
import * as TheMovieDbService from '../services/the-movie-db.service';
import assert from "assert";
import {Movie} from "../models/movie.model";

export enum MovieForeignKeys {
    POSTER = 'movie.poster',
}

export class MovieFetch implements FetchInterface<Movie> {

    constructor() {
    }

    public async handle(keys: string[], model: Movie): Promise<Movie> {
        if (keys.includes(MovieForeignKeys.POSTER)) {
            assert.ok(model.posterPath);
            model.poster = await TheMovieDbService.getMoviePoster(model.posterPath);
        }
        return model;
    }

}