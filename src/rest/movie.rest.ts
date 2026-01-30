import {Session, SessionData} from "express-session";
import {FindMovieQueryParams} from "../models/themoviedb/find-movie-query-params.model";
import {_parseInt, getRandomNumber} from "../utils/math.utils";
import assert from "assert";
import {FindMoviesResponse} from "../models/themoviedb/find-movie-response.model";
import {TheMovieDbMovie} from "../models/themoviedb/the-movie-db-movie.model";
import {GetMovieProvidersResponse} from "../models/themoviedb/get-movie-providers-response.model";
import {GetMovieCreditsResponse} from "../models/themoviedb/get-movie-credits-response.model";
import {app} from "../server";
import * as TheMovieDbService from "../services/the-movie-db.service";
import {asyncHandler} from "../configs/middleware.config";
import {authFilter} from "../services/auth.service";
import {StatusCodes} from "http-status-codes";
import * as MovieService from '../services/movie.service'
import {fromTheMovieDbToMovieDto, toDto} from "../mappers/movie.mapper";
import {CurrentSession} from "../shared/current-session.shared";
import {Movie} from "../models/movie.model";
import {getUserIgnoredMovies, getUserMoviesToWatchLater} from "../services/movie.service";
import {MovieDto} from "../dtos/movie.dto";
import {GetMovieVideosResponse} from "../models/themoviedb/get-movie-videos-response.model";

const PATH: string = 'movie'

const MAX_PAGE: number = 500;
const MAX_TRY: number = 10;

export function setup(): void {
    app.get(`/${PATH}`, asyncHandler(async (req, res) => {
        // console.log(req.sessionID);

        const session: Session & Partial<SessionData> | undefined = CurrentSession.getInstance().session;

        assert.ok(session);

        const sessionCountry: string = CurrentSession.getInstance().country;

        const queryParams: FindMovieQueryParams = new FindMovieQueryParams(req.query);
        queryParams.with_watch_monetization_types = 'flatrate';

        // Se è la prima richiesta di una nuova sessione (session.queryParams === undefined)
        // oppure se è una richiesta diversa dalla precedente ma di una sessione già attiva (session.queryParams !== undefined),
        // allora devo mettere session.totalPages = 1
        if (JSON.stringify(queryParams) !== JSON.stringify(session.queryParams)) {
            session.totalPages = 1;
        }

        session.queryParams = new FindMovieQueryParams(queryParams);

        // Setto quindi una pagina casuale nelle query params
        assert.ok(session.totalPages);
        queryParams.page = getRandomNumber(session.totalPages) + 1;

        // Se queryParams.page > MAX_PAGE, allora correggo e prendo una pagina compresa nel valore massimo consentito
        // Il motivo di questo è qui: https://www.themoviedb.org/talk/625e24be87e63e00674af359
        if (queryParams.page > MAX_PAGE) {
            queryParams.page = getRandomNumber(MAX_PAGE) + 1;
        }

        let sendRequest: boolean = true;

        let _try1: number = 0;
        let movie: MovieDto | null = null;

        do {
            // Interrogo il DB con le queryParams finché non trovo un risultato coincidente
            let response: FindMoviesResponse = await TheMovieDbService.finMoviesByQueryParams(queryParams);

            // Se ci sono risultati...
            if (response.total_results !== undefined && response.total_results > 0) {

                // Setto le pagine totali nella sessione in modo che al
                session.totalPages = response.total_pages;

                const userId: number | undefined = CurrentSession.getInstance().getUserId();

                // Se l'utente è loggato, allora...
                if (userId != null) {
                    const ignoredMovieIds: (number | undefined)[] =
                        await getUserIgnoredMovies(userId)
                            .then(res => res.map(i => i.externalId));

                    let _try2: number = 0;
                    let ignored: boolean = true;

                    let extMovie: TheMovieDbMovie | undefined = undefined;

                    // Prendo un film scelto a caso e controllo che non sia nella lista dei film ignorati utente.
                    // Fino ad un massimo di 5 tentativi
                    while (_try2 < MAX_TRY && ignored) {
                        extMovie = response.results[getRandomNumber(response.results.length)];
                        ignored = ignoredMovieIds.includes(extMovie.id);
                        _try2++;
                    }

                    // Se il film non è stato ignorato, allora procedo a prenderne i dettagli, altrimenti ?? (non definito)
                    if (!ignored) {
                        movie = fromTheMovieDbToMovieDto(await TheMovieDbService.getMovieDetails(extMovie!.id));

                        const sessionUserId: number | undefined = CurrentSession.getInstance().getUserId();

                        if (sessionUserId != null) {
                            const toWatchLater: Movie[] = await getUserMoviesToWatchLater(CurrentSession.getInstance().getUserId()!);
                            movie.watchLater = toWatchLater.map(i => i.externalId).includes(extMovie!.id);
                        }
                    }
                } else {
                    // Prendo un film scelto a caso
                    const extMovie: TheMovieDbMovie = response.results[getRandomNumber(response.results.length)];

                    // Prendo i providers
                    const providersResponse: GetMovieProvidersResponse = await TheMovieDbService.getMovieProviders(extMovie.id!);

                    if (providersResponse.results !== undefined && Object.keys(providersResponse.results).length > 0) {
                        const country = providersResponse.results[sessionCountry];
                        if (country !== undefined) {
                            const flatrate = country['flatrate']
                            if (flatrate !== undefined && flatrate.length > 0) {
                                if (queryParams.with_watch_providers !== undefined && queryParams.with_watch_providers.length > 0) {
                                    const foo: number[] = queryParams.with_watch_providers.split('|').map(i => _parseInt(i)!);
                                    const isGood: boolean = flatrate.some(value => foo.includes(value.provider_id!));
                                    if (isGood) {
                                        // Prendo i dettagli del film scelto a caso
                                        movie = fromTheMovieDbToMovieDto(await TheMovieDbService.getMovieDetails(extMovie.id));
                                        sendRequest = false;
                                    }
                                } else {
                                    // Prendo i dettagli del film scelto a caso
                                    movie = fromTheMovieDbToMovieDto(await TheMovieDbService.getMovieDetails(extMovie.id));
                                    sendRequest = false;
                                }
                            }
                        }
                    }
                }
            }
            _try1++;
        } while (_try1 < MAX_TRY && sendRequest)

        if (movie === null) {
            const timestamp: string = new Date().toISOString();
            console.log(`[INFO] <${timestamp}> No movies found!`);
        }

        res.json(movie);
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
        res.json(response.results?.[country] ?? null);
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
