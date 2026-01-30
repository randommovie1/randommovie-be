import * as db from "../services/database.service";
import {ResultSetHeader, RowDataPacket} from "mysql2/promise";
import {MovieCriteria} from "../criterias/movie.criteria";
import {Movie} from "../models/movie.model";
import {ResourceNotFoundError} from "../errors/resource-not-found.error";
import {MovieFetch} from "../fetches/movie.fetch";
import {SqlCache, SqlCacheKey} from "../shared/sql-cache.shared";

export async function save(model: Movie): Promise<Movie> {
    const query: string =
        'INSERT INTO `random_movie_db`.`movies`' +
        ' (   ' +
        '    `external_id`,' +
        '    `title`,' +
        '    `original_title`,' +
        '    `poster_path`' +
        ' )' +
        ' VALUES (?,?,?,?);';

    const result = await db.doExecute<ResultSetHeader>(
        query,
        [model.externalId, model.title, model.originalTitle, model.posterPath]
    );
    model.id = result[0].insertId;
    return model;
}

export async function findByCriteria(criteria: MovieCriteria): Promise<Movie[]> {
    let query: string =
        'SELECT * FROM \`random_movie_db\`.\`movies\` movie' +
        ' WHERE 1=1';

    if (criteria.id != null) {
        query += ` AND movie.id = ${criteria.id}`;
    }
    if (criteria.ids != null) {
        query += ` AND movie.id in (${criteria.ids.length > 0 ? criteria.ids.join(',') : 'NULL'})`;
    }
    if (criteria.externalId != null) {
        query += ` AND movie.external_id = ${criteria.externalId}`;
    }
    if (criteria.title != null) {
        query += ` AND movie.title = '${criteria.title}'`;
    }
    if (criteria.originalTitle != null) {
        query += ` AND movie.original_title = '${criteria.originalTitle}'`;
    }
    if (criteria.backdropPath != null) {
        query += ` AND movie.backdrop_path = '${criteria.backdropPath}'`;
    }

    query += ';';

    const queryResult = await db.doExecute<RowDataPacket[]>(
        query,
        []
    );
    return Promise.all(queryResult[0].map(async (res) => {
        let model: Movie = Movie.fromResultSet(res);

        if (criteria.fetch != null) {
            model = await new MovieFetch().handle(criteria.fetch, model);
        }

        return model;
    }));
}

export async function findSingleByCriteria(criteria: MovieCriteria): Promise<Movie> {
    const result: Movie = await findByCriteria(criteria).then(res => res[0]);

    if (result == undefined) {
        throw new ResourceNotFoundError();
    }

    return result;
}

export async function findMoviesToWatchLaterByUserId(userId: number): Promise<number[]> {
    let query: string =
        'SELECT movie_id FROM \`random_movie_db\`.\`user_movies_to_watch_later\`' +
        ' WHERE user_id = ?;';

    const result = await db.doExecute<RowDataPacket[]>(
        query,
        [userId],
        true,
        SqlCacheKey.USER_MOVIES_TO_WATCH_LATER
    );

    return result[0].reduce((acc, curr) => {
        acc.push(curr['movie_id']);
        return acc;
    }, [] as unknown as number[]);
}

export async function addMovieToWatchLater(userId: number, movieId: number): Promise<void> {
    const query: string =
        'INSERT INTO \`random_movie_db\`.\`user_movies_to_watch_later\`' +
        ' (' +
        '    `user_id`,' +
        '    `movie_id`' +
        ' )' +
        ' VALUES (?, ?);';

    SqlCache.getInstance().clearCache(SqlCacheKey.USER_MOVIES_TO_WATCH_LATER);

    await db.doExecute<ResultSetHeader>(
        query,
        [userId, movieId]
    );
}

export async function removeMovieFromToWatchLaterByMovieId(movieId: number): Promise<void> {
    const query: string =
        'DELETE FROM \`random_movie_db\`.\`user_movies_to_watch_later\`' +
        ' WHERE movie_id = ?';

    SqlCache.getInstance().clearCache(SqlCacheKey.USER_MOVIES_TO_WATCH_LATER);

    await db.doExecute<ResultSetHeader>(
        query,
        [movieId]
    );
}

export async function removeMovieWatchLaterByUserId(userId: number): Promise<void> {
    const query: string =
        'DELETE FROM \`random_movie_db\`.\`user_movies_to_watch_later\`' +
        ' WHERE user_id = ?';

    SqlCache.getInstance().clearCache(SqlCacheKey.USER_MOVIES_TO_WATCH_LATER);

    await db.doExecute<ResultSetHeader>(
        query,
        [userId]
    );
}

export async function findIgnoredMoviesByUserId(userId: number): Promise<number[]> {
    let query: string =
        'SELECT movie_id FROM \`random_movie_db\`.\`user_ignored_movies\`' +
        ' WHERE user_id = ?;';

    const result = await db.doExecute<RowDataPacket[]>(
        query,
        [userId],
        true,
        SqlCacheKey.USER_IGNORED_MOVIES
    );

    return result[0].reduce((acc, curr) => {
        acc.push(curr['movie_id']);
        return acc;
    }, [] as unknown as number[]);
}

export async function addMovieToIgnore(userId: number, movieId: number): Promise<void> {
    const query: string =
        'INSERT INTO \`random_movie_db\`.\`user_ignored_movies\`' +
        ' (' +
        '    `user_id`,' +
        '    `movie_id`' +
        ' )' +
        ' VALUES (?, ?);';

    SqlCache.getInstance().clearCache(SqlCacheKey.USER_IGNORED_MOVIES);

    await db.doExecute<ResultSetHeader>(
        query,
        [userId, movieId]
    );
}

export async function removeMovieToIgnoreByMovieId(movieId: number): Promise<void> {
    const query: string =
        'DELETE FROM \`random_movie_db\`.\`user_ignored_movies\`' +
        ' WHERE movie_id = ?';

    SqlCache.getInstance().clearCache(SqlCacheKey.USER_IGNORED_MOVIES);

    await db.doExecute<ResultSetHeader>(
        query,
        [movieId]
    );
}

export async function removeMovieIgnoreByUserId(userId: number): Promise<void> {
    const query: string =
        'DELETE FROM \`random_movie_db\`.\`user_ignored_movies\`' +
        ' WHERE user_id = ?';

    SqlCache.getInstance().clearCache(SqlCacheKey.USER_IGNORED_MOVIES);

    await db.doExecute<ResultSetHeader>(
        query,
        [userId]
    );
}
