import {NextFunction, Request, Response} from "express";
import {ValidationError} from "../errors/validation.error";
import {StatusCodes} from "http-status-codes";
import {InvalidLoginError} from "../errors/invalid-login.error";

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction): void {
    console.error(err.stack);
    switch (err.name) {
        case ValidationError.NAME: {
            res.status(StatusCodes.BAD_REQUEST).send(err.message);
            break;
        }
        case InvalidLoginError.NAME: {
            res.status(StatusCodes.UNAUTHORIZED).send(err.message);
            break;
        }
        default: {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
        }
    }
}