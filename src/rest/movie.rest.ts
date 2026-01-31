import {Session, SessionData} from "express-session";
import assert from "assert";
import {
    GetMovieProvidersResponse,
} from "../models/themoviedb/get-movie-providers-response.model";
import {GetMovieCreditsResponse} from "../models/themoviedb/get-movie-credits-response.model";
import {app} from "../server";
import * as TheMovieDbService from "../clients/the-movie-db.client";
import {asyncHandler} from "../configs/middleware.config";
import {authFilter} from "../services/auth.service";
import {StatusCodes} from "http-status-codes";
import * as MovieService from '../services/movie.service'
import {fromTheMovieDbToMovieDto, toDto} from "../mappers/movie.mapper";
import {CurrentSession} from "../shared/current-session.shared";
import {Movie} from "../models/movie.model";
import {MovieDto} from "../dtos/movie.dto";
import {GetMovieVideosResponse} from "../models/themoviedb/get-movie-videos-response.model";
import {DiscoverMovieParams} from "../models/themoviedb/discover-movie-params.model";
import {getRandomNumber} from "../utils/math.utils";
import {TheMovieDbMovie} from "../models/themoviedb/discover-movie-response.model";

const PATH: string = 'movie'

const MAX_PAGE: number = 500;
const MAX_ATTEMPTS: number = 5;

export function setup(): void {
    app.get(`/${PATH}`, asyncHandler(async (req, res) => {
        // console.log(req.sessionID);

        const session: Session & Partial<SessionData> | undefined = CurrentSession.getInstance().session;

        assert.ok(session);

        const queryParams: DiscoverMovieParams = new DiscoverMovieParams(req.query);
        queryParams.with_watch_monetization_types = 'flatrate';

        // If session.queryParams is null/undefined (first session attempt), then this check returns false.
        const isParamsChanged: boolean = JSON.stringify(queryParams) !== JSON.stringify(session.queryParams);

        if (isParamsChanged) {
            session.queryParams = new DiscoverMovieParams(queryParams);
            session.totalPages = (await TheMovieDbService.discoverMovie(queryParams)).total_pages;
        }

        let result: MovieDto | undefined = undefined;

        for (let i = 0; i < MAX_ATTEMPTS; i++) {
            // Sets a random page between
            queryParams.page = getRandomNumber(session.totalPages!) + 1;

            // Checks if page exceed a MAX_PAGE
            if (queryParams.page > MAX_PAGE) {
                queryParams.page = getRandomNumber(MAX_PAGE) + 1;
            }

            let movie: TheMovieDbMovie | undefined = await TheMovieDbService.findMovie(queryParams);

            if (movie) {
                result = fromTheMovieDbToMovieDto(movie);
                break;
            }
            
            i++;
        }

        if (result === undefined) {
            const timestamp: string = new Date().toISOString();
            console.log(`[INFO] <${timestamp}> No movies found! Max attempts: ${MAX_ATTEMPTS}.`);
        }

        res.json(result);
    }));

    app.get(`/${PATH}/details/:movieId`, asyncHandler(async (req, res) => {
        const movieId: number = parseInt(<string>req.params['movieId']);
        assert.ok(movieId);
        const movie: MovieDto = fromTheMovieDbToMovieDto(await TheMovieDbService.getMovieDetails(movieId))
        res.json(movie);
    }));

    app.get(`/${PATH}/mock`, asyncHandler(async (req, res) => {
        res.json({
            "external_id": 306,
            "genres": [
                {
                    "id": 28,
                    "name": "Azione"
                },
                {
                    "id": 35,
                    "name": "Commedia"
                },
                {
                    "id": 80,
                    "name": "Crime"
                }
            ],
            "original_title": "Beverly Hills Cop III",
            "overview": "Il detective Axel Foley stà indagando su un traffico di macchine rubate quando scopre qualcosa di molto molto grosso.",
            "popularity": 41.405,
            "poster_path": "/cOPMgeww6hdlg09vcTYGh0FjbJD.jpg",
            "release_date": "1994-05-24T00:00:00.000Z",
            "runtime": 105,
            "title": "Beverly Hills Cop III - Un piedipiatti a Beverly Hills III",
            "vote_average": 5.9,
            "vote_count": 1845,
            "watchLater": false
        })
    }))

    app.get(`/${PATH}/:movieId/providers`, asyncHandler(async (req, res) => {
        const movieId: number = parseInt(<string>req.params['movieId']);
        const response: GetMovieProvidersResponse = await TheMovieDbService.getMovieProviders(movieId);
        const country: string = CurrentSession.getInstance().country;
        res.json(response.results?.get(country) ?? null);
    }));

    app.get(`/${PATH}/:movieId/credits`, asyncHandler(async (req, res) => {
        const movieId: number = parseInt(<string>req.params['movieId']);
        const response: GetMovieCreditsResponse = await TheMovieDbService.getMovieCredits(movieId);
        res.json(response);
    }));

    app.get(`/${PATH}/:movieId/videos`, asyncHandler(async (req, res) => {
        const movieId: number = parseInt(<string>req.params['movieId']);
        let response: GetMovieVideosResponse = await TheMovieDbService.getMovieVideos(movieId);
        // Se non ci sono risultati per la lingua localizzata, allora procedo a recuperare quelli in lingua inglese
        if (response.results != undefined && response.results.length === 0) {
            response = await TheMovieDbService.getMovieVideos(movieId, 'en-US');
        }
        res.json(response);
    }));

    app.get(`/${PATH}/watch-later`, authFilter, asyncHandler(async (req, res) => {
        const movies: Movie[] = await MovieService.getUserMoviesToWatchLater(req.session.userId as unknown as number, true);
        res.json(movies.map(i => toDto(i)));
    }));

    app.put(`/${PATH}/watch-later`, authFilter, asyncHandler(async (req, res) => {
        const movieId: number = parseInt(req.query.id as unknown as string);
        const userId: number | undefined = req.session.userId;
        assert.ok(userId);
        await MovieService.addMovieToWatchLater(userId, movieId);
        res.sendStatus(StatusCodes.OK);
    }));

    app.delete(`/${PATH}/watch-later`, authFilter, asyncHandler(async (req, res) => {
        const movieId: number = parseInt(req.query.id as unknown as string);
        await MovieService.removeMovieFromToWatchLaterByMovieId(movieId);
        res.sendStatus(StatusCodes.OK);
    }));

    app.get(`/${PATH}/ignore`, authFilter, asyncHandler(async (req, res) => {
        const movies: Movie[] = await MovieService.getUserIgnoredMovies(req.session.userId as unknown as number, true);
        res.json(movies.map(i => toDto(i)));
    }));

    app.put(`/${PATH}/ignore`, authFilter, asyncHandler(async (req, res) => {
        const movieId: number = parseInt(req.query.id as unknown as string);
        const userId: number | undefined = req.session.userId;
        assert.ok(userId);
        await MovieService.addMovieToIgnore(userId, movieId);
        res.sendStatus(StatusCodes.OK);
    }));

    app.delete(`/${PATH}/ignore`, authFilter, asyncHandler(async (req, res) => {
        const movieId: number = parseInt(req.query.id as unknown as string);
        await MovieService.removeMovieToIgnore(movieId);
        res.sendStatus(StatusCodes.OK);
    }));

}
