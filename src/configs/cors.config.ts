import {app} from "../server";

export function config(): void {
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', process.env.DOMAIN);
        res.header('Access-Control-Allow-Credentials', 'true');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Country',);
        next();
    });
}