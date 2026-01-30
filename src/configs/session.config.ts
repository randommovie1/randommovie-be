import session, {SessionOptions} from "express-session";
import e from "express";
import {randomUUID} from "node:crypto";
import assert from "assert";
import {app} from "../server";

export function config(): void {
    const opts: SessionOptions = {
        genid(req: e.Request): string {
            return randomUUID();
        },
        secret: 'mrkn1M36(4*%51b',
        resave: false,
        saveUninitialized: true,
        cookie: {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24,
            sameSite: app.get('env') === 'prod' ? 'none' : 'lax',
        }
    }

    if (app.get('env') === 'prod') {
        assert.ok(opts.cookie);
        /** If you have your node.js behind a proxy and are using secure: true, you need to set “trust proxy” in express */
        // app.set('trust proxy', 1);

        /** To accept only https request */
        opts.cookie.secure = true
    }

    app.use(session(opts));
}