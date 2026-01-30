import {Credential} from "../models/credential.model";
import * as db from '../services/database.service';
import {ResultSetHeader, RowDataPacket} from "mysql2/promise";
import {CredentialCriteria} from "../criterias/credential.criteria";
import {CredentialFetch} from "../fetches/credential.fetch";
import {ResourceNotFoundError} from "../errors/resource-not-found.error";

export async function save(model: Credential): Promise<Credential> {
    const query: string =
        'INSERT INTO \`random_movie_db\`.\`credentials\`' +
        ' (' +
        '    `email`,' +
        '    `password`,' +
        '    `token_id`' +
        ' )' +
        ' VALUES (?, ?, ?);';

    const result = await db.doExecute<ResultSetHeader>(
        query,
        [model.email, model.password, model.token?.id]
    );
    model.id = result[0].insertId;
    return model;
}

export async function update(model: Credential): Promise<Credential> {
    const query: string =
        'UPDATE `random_movie_db`.`credentials`' +
        ' SET ' +
        ' `email` = ?,' +
        ' `password` = ?,' +
        ' `enabled` = ?' +
        ' WHERE `id` = ?;';

    await db.doExecute<ResultSetHeader>(
        query,
        [model.email, model.password,, model.enabled, model.id]
    );

    return model;
}

export async function findByCriteria(criteria: CredentialCriteria): Promise<Credential[]> {
    let query: string =
        'SELECT * from \`random_movie_db\`.\`credentials\` cred' +
        ' WHERE 1=1';

    if (criteria.id != null) {
        query += ` AND cred.id = ${criteria.id}`;
    }

    if (criteria.email != null) {
        query += ` AND cred.email = '${criteria.email}'`;
    }

    // if (criteria.password != null) {
    //     query += ` AND cred.password = '${criteria.password}'`;
    // }

    if (criteria.tokenId != null) {
        query += ` AND cred.token_id = ${criteria.tokenId}`;
    }

    if (criteria.enabled != null) {
        query += ` AND cred.enabled = ${criteria.enabled}`;
    }

    query += ';';

    const queryResult = await db.doExecute<RowDataPacket[]>(
        query,
        []
    );

    return Promise.all(queryResult[0].map(async (res) => {
        let model: Credential = Credential.fromResultSet(res);

        if (criteria.fetch != null) {
            model = await new CredentialFetch().handle(criteria.fetch, model);
        }

        return model;
    }));
}

export async function findSingleByCriteria(criteria: CredentialCriteria): Promise<Credential> {
    const result: Credential = await findByCriteria(criteria).then(res => res[0]);

    if (result == undefined) {
        throw new ResourceNotFoundError();
    }

    return result;
}
