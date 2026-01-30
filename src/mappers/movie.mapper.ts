import {MovieDto} from "../dtos/movie.dto";
import {Movie} from "../models/movie.model";
import {TheMovieDbMovie} from "../models/themoviedb/the-movie-db-movie.model";

export function toDto(model: Movie): MovieDto {
    const dto: MovieDto = new MovieDto();

    dto.external_id = model.externalId;
    dto.id = model.id;
    dto.original_title = model.originalTitle;
    dto.poster = model.poster;
    dto.poster_path = model.posterPath;
    dto.title = model.title;
    dto.watchLater = model.watchLater;

    return dto;
}

export function toModel(dto: MovieDto): Movie {
    const model: Movie = new Movie();

    model.id = dto.id;
    model.poster = dto.poster;
    model.title = dto.title;
    model.watchLater = dto.watchLater;

    return model;
}

export function fromTheMovieDbToMovie(model: TheMovieDbMovie): Movie {
    const entity: Movie = new Movie();

    entity.externalId = model.id;
    entity.originalTitle = model.original_title;
    entity.posterPath = model.poster_path;
    entity.title = model.title;

    return entity;
}

export function fromTheMovieDbToMovieDto(model: TheMovieDbMovie): MovieDto {
    const dto: MovieDto = new MovieDto();

    dto.genres = model.genres != null ? model.genres?.map(i => ({id: i.id, name: i.name})) : undefined;
    dto.external_id = model.id;
    dto.original_title = model.original_title;
    dto.overview = model.overview;
    dto.popularity = model.popularity;
    dto.poster_path = model.poster_path;
    dto.release_date = model.release_date != null ? new Date(model.release_date) : undefined;
    dto.runtime = model.runtime;
    dto.title = model.title;
    dto.vote_average = model.vote_average;
    dto.vote_count = model.vote_count;
    dto.production_countries = model.production_countries != null ? model.production_countries?.map(i => ({
        iso_3166_1: i.iso_3166_1,
        name: i.name
    })) : undefined;

    return dto;
}
