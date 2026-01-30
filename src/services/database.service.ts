import mysql, {FieldPacket, QueryResult, ResultSetHeader, RowDataPacket} from "mysql2/promise";
import * as fs from "node:fs";
import {pool} from "../configs/database.config";
import {SqlCache, SqlCacheKey} from "../shared/sql-cache.shared";
import * as StringUtils from "../utils/string.utils"
import {stringToBoolean} from "../utils/boolean.utils";

/**
 * From mysql2 docs.
 *
 * ResultSetHeader: For INSERT, UPDATE, DELETE, TRUNCATE, etc...
 * ResultSetHeader[]: For multiples INSERT, UPDATE, DELETE, TRUNCATE, etc. when using multipleStatements as true.
 * RowDataPacket[]: For SELECT.
 * RowDataPacket[][]: For multiples SELECT using multipleStatements option as true with multiple queries.
 *
 */

export type DBQueryResponse<T> = [T, FieldPacket[]];

const _connection: Promise<mysql.PoolConnection> | undefined =
    stringToBoolean(process.env.DATABASE_ENABLE_DB) ? pool!.getConnection() : undefined;
const connection: Promise<mysql.PoolConnection> = _connection!;
const debug: boolean = stringToBoolean(process.env.DATABASE_QUERY_DEBUG);

export async function dropAndCreate(): Promise<void> {
    await dropDatabase();
    await createDatabase();
    await useDatabase();
}

async function dropDatabase(): Promise<DBQueryResponse<QueryResult>> {
    return await doQuery('DROP DATABASE IF EXISTS `random_movie_db`;', []);
}

async function createDatabase(): Promise<DBQueryResponse<QueryResult>> {
    return await doQuery('CREATE DATABASE IF NOT EXISTS `random_movie_db`;', []);
}

async function useDatabase(): Promise<DBQueryResponse<QueryResult>> {
    return await doQuery('USE `random_movie_db`;', []);
}

export async function doMigrations(): Promise<DBQueryResponse<QueryResult>> {
    const file: string[] = [
        fs.readFileSync('src/database/migrations/0000_init.sql', 'utf8'),
        fs.readFileSync('src/database/migrations/0001_users.sql', 'utf8'),
    ];
    const query: string = file.reduce((acc, curr) => acc + curr, '');
    return await doQuery(query, []);
}

export async function _doExecute<T extends ResultSetHeader | ResultSetHeader[] | RowDataPacket[] | RowDataPacket[][]>(
    query: string,
    values: any
): Promise<DBQueryResponse<T>> {
    return connection.then(conn => conn.execute<T>(query, values));
}

export async function doExecute<T extends ResultSetHeader | ResultSetHeader[] | RowDataPacket[] | RowDataPacket[][]>(
    query: string,
    values: any,
    cache: boolean | undefined = undefined,
    cacheKey: SqlCacheKey | undefined = undefined
): Promise<DBQueryResponse<T>> {
    if (debug) {
        console.log(query);
    }

    if (cache === true) {
        const hashcode: string = StringUtils.simpleHash(query);
        const cache: DBQueryResponse<T> | undefined = SqlCache.getInstance().getCache<T>(cacheKey!);
        if (cache == null) {
            return _doExecute<T>(query, values).then(res => {
                SqlCache.getInstance().addCache<T>(cacheKey!, hashcode, res)
                return res;
            });

        } else {
            return new Promise(resolve => resolve(cache));
        }
    } else {
        return _doExecute<T>(query, values);
    }
}

export async function _doQuery<T extends ResultSetHeader | ResultSetHeader[] | RowDataPacket[] | RowDataPacket[][]>(
    query: string,
    values: any,
): Promise<DBQueryResponse<T>> {
    return connection.then(conn => conn.query<T>(query, values));
}

export async function doQuery<T extends ResultSetHeader | ResultSetHeader[] | RowDataPacket[] | RowDataPacket[][]>(
    query: string,
    values: any,
    cache: boolean | undefined = undefined,
    cacheKey: SqlCacheKey | undefined = undefined
): Promise<DBQueryResponse<T>> {
    if (debug) {
        console.log(query);
    }

    if (cache === true) {
        const hashcode: string = StringUtils.simpleHash(query);
        const cache: DBQueryResponse<T> | undefined = SqlCache.getInstance().getCache<T>(cacheKey!);
        if (cache == null) {
            return _doQuery<T>(query, values).then(res => {
                SqlCache.getInstance().addCache<T>(cacheKey!, hashcode, res)
                return res;
            });

        } else {
            return new Promise(resolve => resolve(cache));
        }
    } else {
        return _doQuery<T>(query, values);
    }
}

export async function beginTransaction(): Promise<void> {
    return await connection.then(conn => conn.beginTransaction());
}

export async function commit(): Promise<void> {
    return await connection.then(conn => conn.commit());
}

export async function rollback(): Promise<void> {
    return await connection.then(conn => conn.rollback());
}

export async function release(): Promise<void> {
    return await connection.then(conn => conn.release());
}

export async function getConnection(): Promise<mysql.PoolConnection> {
    return await connection;
}
