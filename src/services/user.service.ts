import {User} from "../models/user.model";
import * as UserRepository from '../repositories/user.repository';
import {UserCriteria} from "../criterias/user.criteria";
import {UserForeignKeys} from "../fetches/user.fetch";
import {CredentialForeignKeys} from "../fetches/credential.fetch";
import assert from "assert";
import {ResourceNotFoundError} from "../errors/resource-not-found.error";

export async function save(model: User): Promise<User> {
    assert.ok(model.id == null);
    return await UserRepository.save(model);
}

export async function findByCriteria(criteria: UserCriteria): Promise<User[]> {
    return await UserRepository.findByCriteria(criteria);
}

export async function findSingleByCriteria(criteria: UserCriteria): Promise<User> {
    const result: User[] = await findByCriteria(criteria);

    if (result.length == 0) {
        throw new ResourceNotFoundError();
    }

    return result[0];
}

export async function getUserById(id: number): Promise<User> {
    const userCriteria: UserCriteria = new UserCriteria();
    userCriteria.id = id;
    userCriteria.fetch = [
        UserForeignKeys.CREDENTIAL,
        CredentialForeignKeys.TOKEN,
    ]
    return await findSingleByCriteria(userCriteria);
}

export async function update(model: User): Promise<User> {
    assert.ok(model.id != null);
    return await UserRepository.update(model);
}

export async function deleteUser(id: number): Promise<void> {
    const userCriteria: UserCriteria = new UserCriteria();
    userCriteria.id = id;
    userCriteria.fetch = [
        UserForeignKeys.CREDENTIAL,
        CredentialForeignKeys.TOKEN
    ];
    const user: User = await findSingleByCriteria(userCriteria);
    user.deleted = true;
    await update(user);
}