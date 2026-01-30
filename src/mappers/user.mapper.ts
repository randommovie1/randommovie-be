import {User} from "../models/user.model";
import {UserDto} from "../dtos/user.dto";
import * as CredentialMapper from './credential.mapper'
import * as MovieMapper from './movie.mapper'

export function toDto(model: User): UserDto {
    const dto: UserDto = new UserDto();

    dto.id = model.id;
    dto.displayName = model.displayName;
    dto.credential = model.credential != null ? CredentialMapper.toDto(model.credential) : undefined;
    dto.moviesToWatchLater = model.moviesToWatchLater != null ? model.moviesToWatchLater.map(i => MovieMapper.toDto(i)) : undefined;
    dto.ignoredMovies = model.ignoredMovies != null ? model.ignoredMovies.map(i => MovieMapper.toDto(i)) : undefined;

    return dto;
}

export function toModel(dto: UserDto): User {
    const model: User = new User();

    model.id = dto.id;
    model.displayName = dto.displayName;
    model.credential = dto.credential != null ? CredentialMapper.toModel(dto.credential) : undefined;
    model.moviesToWatchLater = dto.moviesToWatchLater != null ? dto.moviesToWatchLater.map(i => MovieMapper.toModel(i)) : undefined;
    model.ignoredMovies = dto.ignoredMovies != null ? dto.ignoredMovies.map(i => MovieMapper.toModel(i)) : undefined;
    return model;
}