import {Token} from "../models/token.model";
import * as db from '../services/database.service';
import {ResultSetHeader, RowDataPacket} from "mysql2/promise";
import {TokenCriteria} from "../criterias/token.criteria";
import {ResourceNotFoundError} from "../errors/resource-not-found.error";

export async function save(model: Token): Promise<Token> {
    const query: string =
        'INSERT INTO `random_movie_db`.`tokens`' +
        ' (' +
        '    `uuid`' +
        ' )' +
        ' VALUES (?);';

    const result = await db.doExecute<ResultSetHeader>(
        query,
        [model.uuid]);
    model.id = result[0].insertId;
    return model;
}

export async function update(model: Token): Promise<Token> {
    const query: string =
        'UPDATE `random_movie_db`.`tokens`' +
        ' SET' +
        ' consumed = ?,' +
        ' consumed_datetime = ?' +
        ' WHERE id = ?';

    const result = await db.doExecute<ResultSetHeader>(
        query,
        [model.consumed, model.consumedDatetime, model.id]);

    return model;
}

export async function findByCriteria(criteria: TokenCriteria): Promise<Token[]> {
    let query: string =
        'SELECT * from \`random_movie_db\`.\`tokens\` tok' +
        ' WHERE 1=1';

    if (criteria.id != null) {
        query += ` AND tok.id = ${criteria.id}`;
    }

    if (criteria.uuid != null) {
        query += ` AND tok.uuid = '${criteria.uuid}'`;
    }

    if (criteria.consumed != null) {
        query += ` AND tok.consumed = ${criteria.consumed}`;
    }

    query += ';';

    const queryResult = await db.doExecute<RowDataPacket[]>(
        query,
        []
    );

    return queryResult[0].map(res => Token.fromResultSet(res));
}

export async function findSingleByCriteria(criteria: TokenCriteria): Promise<Token> {
    const result: Token = await findByCriteria(criteria).then(res => res[0]);

    if (result == undefined) {
        throw new ResourceNotFoundError();
    }

    return result;
}
