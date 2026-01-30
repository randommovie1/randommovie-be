import {DBQueryResponse} from "../services/database.service";
import {CurrentSession} from "./current-session.shared";
import assert from "assert";

export enum SqlCacheKey {
    USER_MOVIES_TO_WATCH_LATER = 'userMoviesToWatchLater',
    USER_IGNORED_MOVIES = 'userIgnoredMovies'
}

interface SqlCacheMapPayload {
    hashcode: string,
    payload: DBQueryResponse<any>
}

export class SqlCache {

    private static instance: SqlCache | undefined = undefined;

    private readonly cache: Map<string, SqlCacheMapPayload> = new Map();

    private constructor() {
    }

    public static getInstance(): SqlCache {
        if (this.instance === undefined) {
            this.instance = new SqlCache();
        }
        return this.instance;
    }

    public addCache<T>(key: SqlCacheKey, hashcode: string, payload: DBQueryResponse<T>): void {
        const keyMap: string = this.generateKey(key);
        if (!this.cache.has(keyMap)) {
            this.cache.set(keyMap, {hashcode, payload});
        } else {
            const _payload: SqlCacheMapPayload | undefined = this.cache.get(keyMap);
            if (hashcode !== _payload?.hashcode) {
                this.cache.delete(keyMap);
                this.cache.set(keyMap, {hashcode, payload});
            }
        }
    }

    public getCache<T>(key: SqlCacheKey): DBQueryResponse<T> | undefined {
        return this.cache.get(this.generateKey(key))?.payload;
    }

    public clearCache(key: SqlCacheKey): void {
        this.cache.delete(this.generateKey(key));
    }

    private generateKey(key: SqlCacheKey): string {
        const userId: number | undefined = CurrentSession.getInstance().getUserId();
        assert.ok(userId);
        return `${userId}-${key}`;
    }

}