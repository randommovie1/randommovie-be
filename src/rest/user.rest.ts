import {app} from "../server";
import {User} from "../models/user.model";
import * as UserService from "../services/user.service";
import * as UserMapper from "../mappers/user.mapper";
import {authFilter} from "../services/auth.service";
import assert from "assert";
import {asyncHandler} from "../configs/middleware.config";
import {StatusCodes} from "http-status-codes";
import {Session, SessionData} from "express-session";

const PATH: string = 'user'

export function setup(): void {
    app.get(`/${PATH}`, authFilter, asyncHandler(async (req, res) => {
        const _session: Session & Partial<SessionData> = req.session;

        assert.ok(_session.userId);

        const user: User = await UserService.getUserById(_session.userId);
        res.json(UserMapper.toDto(user));
    }));

    app.get(`/${PATH}/:id`, asyncHandler(async (req, res) => {
        const user: User = await UserService.getUserById(parseInt(<string>req.params['id']));
        res.json(UserMapper.toDto(user));
    }));

    app.delete(`/${PATH}`, authFilter, asyncHandler(async (req, res) => {
        assert.ok(req.session.userId);
        await UserService.deleteUser(req.session.userId);
        res.sendStatus(StatusCodes.OK);
    }));
}