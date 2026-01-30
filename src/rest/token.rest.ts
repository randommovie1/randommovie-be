import {app} from "../server";
import {asyncHandler} from "../configs/middleware.config";
import * as TokenService from '../services/token.service'
import {StatusCodes} from "http-status-codes";

const PATH: string = 'token';

export function setup(): void {
    app.put(`/${PATH}/consume/:tokenId`, asyncHandler(async (req, res) => {
        const token: string = <string>req.params['tokenId'];
        await TokenService.consumeToken(token);
        res.sendStatus(StatusCodes.OK);
    }))
}