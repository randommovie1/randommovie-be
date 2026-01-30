import {User} from "../models/user.model";
import * as UserRepository from '../repositories/user.repository';
import {UserCriteria} from "../criterias/user.criteria";
import {UserForeignKeys} from "../fetches/user.fetch";
import {CredentialForeignKeys} from "../fetches/credential.fetch";
import assert from "assert";

export async function save(model: User): Promise<User> {
    assert.ok(model.id == null);
    return await UserRepository.save(model);
}

export async function getUserById(id: number): Promise<User> {
    const userCriteria: UserCriteria = new UserCriteria();
    userCriteria.id = id;
    userCriteria.fetch = [
        UserForeignKeys.CREDENTIAL,
        CredentialForeignKeys.TOKEN,
    ]
    return await UserRepository.findSingleByCriteria(userCriteria);
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
    const user: User = await UserRepository.findSingleByCriteria(userCriteria);
    user.deleted = true;
    await update(user);
}