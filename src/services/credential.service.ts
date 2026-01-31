import {Credential} from "../models/credential.model";
import * as CredentialRepository from '../repositories/credential.repository';
import assert from "assert";
import {CredentialCriteria} from "../criterias/credential.criteria";
import {ResourceNotFoundError} from "../errors/resource-not-found.error";

export async function save(model: Credential): Promise<Credential> {
    assert(model.id == null);
    return await CredentialRepository.save(model);
}

export async function update(model: Credential): Promise<Credential> {
    assert(model.id != null);
    return await CredentialRepository.update(model);
}

export async function findSingleByCriteria(criteria: CredentialCriteria): Promise<Credential> {
    const result: Credential[] = await findByCriteria(criteria);

    if (result.length == 0) {
        throw new ResourceNotFoundError();
    }

    return result[0];
}

export async function findByCriteria(criteria: CredentialCriteria): Promise<Credential[]> {
    return CredentialRepository.findByCriteria(criteria);
}