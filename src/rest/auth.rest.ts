import {app} from "../server";
import {SignupDto} from "../dtos/signup.dto";
import * as AuthService from '../services/auth.service';
import * as LoginMapper from '../mappers/login.mapper'
import * as SignupMapper from '../mappers/signup.mapper'
import * as UserMapper from '../mappers/user.mapper';
import {LoginDto} from "../dtos/login.dto";
import {User} from "../models/user.model";
import * as SignupValidator from "../validators/signup.validator";
import * as LoginValidator from "../validators/login.validator";
import {normalizeWhitespace} from "../utils/string.utils";
import {authFilter} from "../services/auth.service";
import assert from "assert";
import {asyncHandler} from "../configs/middleware.config";
import {Request, Response} from 'express';
import {StatusCodes} from "http-status-codes";

const PATH: string = 'auth'

export function setup(): void {
    /** For testing purpose */
    app.get(`/${PATH}/protected`, authFilter, asyncHandler(async (req, res) => {
        res.json('You have access to this protected route!');
    }))

    app.post(`/${PATH}/login`, asyncHandler(async (req, res) => {
        const login: LoginDto = new LoginDto(req.body);

        LoginValidator.validate(login);

        const token: string = await AuthService.login(LoginMapper.toModel(login), req);
        res.send(token);
    }))

    app.post(`/${PATH}/logout`, (req, res) => {
        req.session.destroy(err => {
            if (err != null) {
                return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
            }
            res.sendStatus(StatusCodes.OK);
        });
    });

    app.post(`/${PATH}/signup`, asyncHandler(async (req: Request, res: Response) => {
        const signup: SignupDto = new SignupDto(req.body);

        signup.displayName = normalizeWhitespace(signup.displayName);

        SignupValidator.validate(signup);

        const user: User = await AuthService.signup(SignupMapper.toModel(signup));
        res.json(UserMapper.toDto(user));
    }))

    app.post(`/${PATH}/reset-password`, authFilter, asyncHandler(async (req, res) => {
        const userId: number | undefined = req.session.userId;
        assert.ok(userId);
        await AuthService.resetPassword(userId, req.body.password);
        res.send();
    }))

    app.get(`/${PATH}/check-email/:email`, asyncHandler(async (req, res) => {
        const email: string | undefined = <string>req.params['email'];
        assert.ok(email);
        res.send(await AuthService.checkEmail(email));
    }))

    app.get(`/${PATH}/check-username/:username`, asyncHandler(async (req, res) => {
        const username: string | undefined = <string>req.params['username'];
        assert.ok(username);
        res.send(await AuthService.checkUsername(username));
    }))
}