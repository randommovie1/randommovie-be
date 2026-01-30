import mysql from "mysql2/promise";
import {_parseInt} from "../utils/math.utils";
import {stringToBoolean} from "../utils/boolean.utils";

let pool: mysql.Pool | undefined = undefined;

if (stringToBoolean(process.env.DATABASE_ENABLE_DB)) {
    pool = mysql.createPool({
        host: process.env.DATABASE_HOST,
        port: _parseInt(process.env.DATABASE_PORT),
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        waitForConnections: true,
        connectionLimit: 10,
        maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
        idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
        queueLimit: 0,
        enableKeepAlive: true,
        keepAliveInitialDelay: 0,
        multipleStatements: true,
    });
}

export {pool};