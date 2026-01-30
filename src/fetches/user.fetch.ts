import {FetchInterface} from "./fetch.interface";
import {User} from "../models/user.model";
import * as CredentialRepository from "../repositories/credential.repository";
import {CredentialCriteria} from "../criterias/credential.criteria";
import * as MovieService from "../services/movie.service";
import assert from "assert";

export enum UserForeignKeys {
    CREDENTIAL = 'user.credential',
    MOVIES_TO_WATCH_LATER = 'user.movies_to_watch_later',
    IGNORED_MOVIES = 'user.ignored_movie',
}

export class UserFetch implements FetchInterface<User> {

    constructor() {
    }

    public async handle(keys: string[], model: User): Promise<User> {
        if (keys.includes(UserForeignKeys.CREDENTIAL)) {
            const credentialCriteria: CredentialCriteria = new CredentialCriteria();
            credentialCriteria.id = model.credential?.id;
            credentialCriteria.fetch = keys;
            model.credential = await CredentialRepository.findSingleByCriteria(credentialCriteria);
        }

        if (keys.includes(UserForeignKeys.MOVIES_TO_WATCH_LATER)) {
            assert.ok(model.id);
            model.moviesToWatchLater = await MovieService.getUserMoviesToWatchLater(model.id);
        }

        if (keys.includes(UserForeignKeys.IGNORED_MOVIES)) {
            assert.ok(model.id);
            model.ignoredMovies = await MovieService.getUserIgnoredMovies(model.id);
        }

        return model;
    }

}