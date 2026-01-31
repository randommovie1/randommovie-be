import {User} from "../models/user.model";
import * as db from '../services/database.service';
import {ResultSetHeader, RowDataPacket} from "mysql2/promise";
import {UserCriteria} from "../criterias/user.criteria";
import {UserFetch} from "../fetches/user.fetch";

export async function save(model: User): Promise<User> {
    const query: string =
        'INSERT INTO `random_movie_db`.`users`' +
        ' (   ' +
        '    `display_name`,' +
        '    `credential_id`' +
        ' )' +
        ' VALUES (?,?);';

    const result = await db.doExecute<ResultSetHeader>(
        query,
        [model.displayName, model.credential?.id]
    );
    model.id = result[0].insertId;
    return model;
}

export async function update(model: User): Promise<User> {
    let query: string =
        'UPDATE `random_movie_db`.`users`' +
        ' SET' +
        ' `display_name` = ?,' +
        ' `deleted` = ?' +
        ' WHERE `id` = ?;';

    const queryResult = await db.doExecute<ResultSetHeader[]>(
        query,
        [model.displayName, model.deleted, model.id]
    );

    return model;
}

export async function findByCriteria(criteria: UserCriteria): Promise<User[]> {
    let query: string =
        'SELECT * from \`random_movie_db\`.\`users\` usr' +
        ' WHERE 1=1';

    if (criteria.id != null) {
        query += ` AND usr.id = ${criteria.id}`;
    }

    if (criteria.displayName != null) {
        query += ` AND usr.display_name = '${criteria.displayName}'`;
    }

    if (criteria.credentialId != null) {
        query += ` AND usr.credential_id = ${criteria.credentialId}`;
    }

    query += ';';

    const queryResult = await db.doExecute<RowDataPacket[]>(
        query,
        []
    );

    return Promise.all(queryResult[0].map(async (res) => {
        let model: User = User.fromResultSet(res);

        if (criteria.fetch != null) {
            model = await new UserFetch().handle(criteria.fetch, model);
        }

        return model;
    }));
}
