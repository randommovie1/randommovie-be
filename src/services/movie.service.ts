import assert from "assert";
import * as MovieRepository from "../repositories/movie.repository";
import {MovieCriteria} from "../criterias/movie.criteria";
import * as TheMovieDbService from "../clients/the-movie-db.client"
import {ResourceNotFoundError} from "../errors/resource-not-found.error";
import {MovieForeignKeys} from "../fetches/movie.fetch";
import {Movie} from "../models/movie.model";
import {fromTheMovieDbToMovie} from "../mappers/movie.mapper";
import {TheMovieDbMovie} from "../models/themoviedb/discover-movie-response.model";

export async function findSingleByCriteria(criteria: MovieCriteria): Promise<Movie> {
    const result: Movie[] = await findByCriteria(criteria);

    if (result.length == 0) {
        throw new ResourceNotFoundError();
    }

    return result[0];
}

export async function findByCriteria(criteria: MovieCriteria): Promise<Movie[]> {
    return await MovieRepository.findByCriteria(criteria);
}

export async function getUserMoviesToWatchLater(userId: number, fetchPoster: boolean = false): Promise<Movie[]> {
    const criteria: MovieCriteria = new MovieCriteria();
    criteria.ids = [...await findAllMoviesToWatchLaterByUserId(userId)];
    if (fetchPoster) {
        criteria.fetch = [MovieForeignKeys.POSTER];
    }
    return await MovieRepository.findByCriteria(criteria);
}

async function findAllMoviesToWatchLaterByUserId(userId: number): Promise<number[]> {
    assert.ok(userId);

    return await MovieRepository.findMoviesToWatchLaterByUserId(userId);
}

export async function save(model: Movie): Promise<Movie> {
    assert.ok(model.id == null);
    return await MovieRepository.save(model);
}

export async function addMovieToWatchLater(userId: number, movieId: number): Promise<void> {
    const movieCriteria: MovieCriteria = new MovieCriteria();
    movieCriteria.externalId = movieId;

    let movie: Movie | undefined = undefined;

    try {
        movie = await findSingleByCriteria(movieCriteria);
    } catch (e: any) {
        if (e.name === ResourceNotFoundError.NAME) {
            const extMovie: TheMovieDbMovie = await TheMovieDbService.getMovieDetails(movieId);
            movie = await save(fromTheMovieDbToMovie(extMovie));
        } else {
            throw e;
        }
    }

    assert.ok(movie != null && movie.id != null);

    await MovieRepository.addMovieToWatchLater(userId, movie.id);
}

export async function removeMovieFromToWatchLaterByMovieId(movieId: number): Promise<void> {
    assert.ok(movieId);

    await MovieRepository.removeMovieFromToWatchLaterByMovieId(movieId);
}

export async function removeMovieWatchLaterByUserId(userId: number): Promise<void> {
    assert.ok(userId);

    await MovieRepository.removeMovieWatchLaterByUserId(userId);
}

export async function getUserIgnoredMovies(userId: number, fetchPoster: boolean = false): Promise<Movie[]> {
    const criteria: MovieCriteria = new MovieCriteria();
    criteria.ids = [...await findAllIgnoredMoviesByUserId(userId)];
    if (fetchPoster) {
        criteria.fetch = [MovieForeignKeys.POSTER];
    }
    return await MovieRepository.findByCriteria(criteria);
}

async function findAllIgnoredMoviesByUserId(userId: number): Promise<number[]> {
    assert.ok(userId);

    return await MovieRepository.findIgnoredMoviesByUserId(userId);
}

export async function addMovieToIgnore(userId: number, movieId: number): Promise<void> {
    assert.ok(userId);
    assert.ok(movieId);

    const movieCriteria: MovieCriteria = new MovieCriteria();
    movieCriteria.externalId = movieId;

    let movie: Movie | undefined = undefined;

    try {
        movie = await findSingleByCriteria(movieCriteria);
    } catch (e: any) {
        if (e.name === ResourceNotFoundError.NAME) {
            const extMovie: TheMovieDbMovie = await TheMovieDbService.getMovieDetails(movieId);
            movie = await save(fromTheMovieDbToMovie(extMovie));
        } else {
            throw e;
        }
    }

    assert.ok(movie != null && movie.id != null);

    await MovieRepository.addMovieToIgnore(userId, movie.id);
}

export async function removeMovieToIgnore(movieId: number): Promise<void> {
    assert.ok(movieId);

    return await MovieRepository.removeMovieToIgnoreByMovieId(movieId);
}

export async function removeMovieToIgnoreByUserId(userId: number): Promise<void> {
    assert.ok(userId);

    return await MovieRepository.removeMovieIgnoreByUserId(userId);
}

