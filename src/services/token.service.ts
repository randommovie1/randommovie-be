import {Token} from "../models/token.model";
import * as TokenRepository from '../repositories/token.repository';
import * as CredentialRepository from '../repositories/credential.repository';
import {TokenCriteria} from "../criterias/token.criteria";
import {CredentialCriteria} from "../criterias/credential.criteria";
import {Credential} from "../models/credential.model";
import assert from "assert";
import * as DatabaseService from "./database.service";
import {CredentialForeignKeys} from "../fetches/credential.fetch";

export async function save(model: Token): Promise<Token> {
    return await TokenRepository.save(model);
}

export async function consumeToken(uuid: string): Promise<void> {
    const tokenCriteria: TokenCriteria = new TokenCriteria();
    tokenCriteria.uuid = uuid;
    const token: Token = await TokenRepository.findSingleByCriteria(tokenCriteria);

    assert.ok(token.consumed === false);

    token.consumed = true;
    token.consumedDatetime = new Date();

    const credentialCriteria: CredentialCriteria = new CredentialCriteria();
    credentialCriteria.tokenId = token.id;
    const credential: Credential = await CredentialRepository.findSingleByCriteria(credentialCriteria);
    credential.enabled = true;

    try {
        await DatabaseService.beginTransaction();

        await TokenRepository.update(token);
        await CredentialRepository.update(credential);

        await DatabaseService.commit();
    } catch (e) {
        await DatabaseService.rollback();
        throw e;
    } finally {
        await DatabaseService.release();
    }

}
