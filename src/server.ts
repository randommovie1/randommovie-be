import express, {Express} from 'express';
import dotenv from 'dotenv';
import * as db from './services/database.service';
import {stringToBoolean} from "./utils/boolean.utils";
import * as SessionConfig from './configs/session.config'
import * as CorsConfig from './configs/cors.config'
import * as AxiosConfig from './configs/axios.config'
import * as AuthRest from './rest/auth.rest';
import * as CredentialRest from './rest/credential.rest'
import * as KeywordRest from './rest/keyword.rest'
import * as MovieRest from './rest/movie.rest'
import * as PersonRest from './rest/person.rest'
import * as PosterRest from './rest/poster.rest'
import * as TokenRest from './rest/token.rest'
import * as UserRest from './rest/user.rest';
import * as UtilsRest from './rest/utils.rest';
import * as Geolocation from './rest/geolocation.rest';
import {_parseInt} from "./utils/math.utils";
import assert from "assert";
import {errorHandler} from "./configs/error-handler";
import {interceptor} from "./configs/middleware.config";

export const app: Express = express();

dotenv.config();

console.log(`Running on ${process.env.ENVIRONMENT} env`);

app.set('env', process.env.ENVIRONMENT);

const port: number | undefined = _parseInt(process.env.PORT);
assert.ok(port);

app.use(express.json());


// CONFIG
AxiosConfig.config();
SessionConfig.config();
CorsConfig.config();
// END CONFIG

// before rest
app.use(interceptor);

// REST - Need to be after SessionConfig.config();
AuthRest.setup();
CredentialRest.setup();
KeywordRest.setup();
MovieRest.setup();
PersonRest.setup();
PosterRest.setup();
TokenRest.setup();
UserRest.setup();
UtilsRest.setup();
Geolocation.setup();
// END REST

// After rest config
app.use(errorHandler);

// DATABASE
if (
    stringToBoolean(process.env.DATABASE_ENABLE_DB) &&
    stringToBoolean(process.env.DATABASE_DROP)
) {
    db.dropAndCreate().then(() => db.doMigrations());
}
// END DATABASE

// MailService.sendTestEmail();

if (app.get('env') === 'prod') {
    app.enable('trust proxy');
}

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
