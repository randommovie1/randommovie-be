import {Request, Response, NextFunction} from 'express';
import {CurrentSession} from "../shared/current-session.shared";

export function asyncHandler(fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) {
    return function (req: Request, res: Response, next: NextFunction) {
        fn(req, res, next).catch(next);
    };
}

export function interceptor(req: Request, res: Response, next: NextFunction) {
    const currentSession: CurrentSession = CurrentSession.getInstance();
    if (currentSession.session === undefined) {
        currentSession.session = req.session;
    }
    const country: string | string[] | undefined = req.headers['country'];
    if (country !== undefined) {
        currentSession.session.country = country as string;
    } else {
        currentSession.session.country = undefined;
    }
    if (req.method !== 'OPTIONS') {
        console.log(`${req.method} ${req.url}`);
    }
    next();
}
