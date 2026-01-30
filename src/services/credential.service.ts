import {Credential} from "../models/credential.model";
import * as CredentialRepository from '../repositories/credential.repository';
import assert from "assert";

export async function save(model: Credential): Promise<Credential> {
    assert(model.id == null);
    return await CredentialRepository.save(model);
}

export async function update(model: Credential): Promise<Credential> {
    assert(model.id != null);
    return await CredentialRepository.update(model);
}