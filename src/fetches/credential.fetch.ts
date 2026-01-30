import {FetchInterface} from "./fetch.interface";
import * as TokenRepository from "../repositories/token.repository";
import {TokenCriteria} from "../criterias/token.criteria";
import {Credential} from "../models/credential.model";

export enum CredentialForeignKeys {
    TOKEN = 'credential.token',
}

export class CredentialFetch implements FetchInterface<Credential> {

    constructor() {
    }

    public async handle(keys: string[], model: Credential): Promise<Credential> {
        if (keys.includes(CredentialForeignKeys.TOKEN)) {
            const tokenCriteria: TokenCriteria = new TokenCriteria();
            tokenCriteria.id = model.token?.id;
            model.token = await TokenRepository.findSingleByCriteria(tokenCriteria);
        }
        return model;
    }
}