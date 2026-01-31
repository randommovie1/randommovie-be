import {FetchInterface} from "./fetch.interface";
import * as TokenService from "../services/token.service";
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
            model.token = await TokenService.findSingleByCriteria(tokenCriteria);
        }
        return model;
    }
}