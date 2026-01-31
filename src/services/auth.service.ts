import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import {Signup} from "../models/signup.model";
import {Login} from "../models/login.model";
import {randomUUID} from "node:crypto";
import * as TokenService from '../services/token.service';
import * as CredentialService from '../services/credential.service';
import * as UserService from '../services/user.service';
import {User} from "../models/user.model";
import {Token} from "../models/token.model";
import {Credential} from "../models/credential.model";
import {CredentialCriteria} from "../criterias/credential.criteria";
import assert from "assert";
import bcrypt from 'bcrypt'
import {InvalidLoginError} from "../errors/invalid-login.error";
import {UserCriteria} from "../criterias/user.criteria";
import {Session, SessionData} from "express-session";
import {UserForeignKeys} from "../fetches/user.fetch";
import * as DatabaseService from "../services/database.service";
import {ResourceNotFoundError} from "../errors/resource-not-found.error";
import {CurrentSession} from "../shared/current-session.shared";

const secretKey = 'Xukveo=y#!#GUi8';

export interface AuthTokenPayload {
    userId: number | undefined;
    email: string | undefined;
}

export const genToken = (payload: AuthTokenPayload): string => jwt.sign(payload, secretKey);

export const authFilter = (req: Request, res: Response, next: NextFunction) => {
    const authHeader: string | undefined = req.headers['authorization'];

    if (authHeader == null) {
        res.sendStatus(401);
        return;
    }

    const token: string = authHeader.split(' ')[1];

    if (token == null) {
        res.sendStatus(401);
        return;
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err != null) {
            res.sendStatus(403);
            return;
        }
        const _session: Session & Partial<SessionData> = req.session;
        _session.userId = (decoded as AuthTokenPayload).userId;
        CurrentSession.getInstance().session = _session;
        next();
    });
};

export async function login(model: Login, req: Request): Promise<string> {
    assert.ok(model.email);
    assert.ok(model.password);

    const credentialCriteria: CredentialCriteria = new CredentialCriteria();
    credentialCriteria.email = model.email;

    let credential: Credential | undefined = undefined;

    try {
        credential = await CredentialService.findSingleByCriteria(credentialCriteria);
    } catch (e) {
        throw new InvalidLoginError();
    }

    if (credential.password == null) {
        throw new Error();
    }

    const userCriteria: UserCriteria = new UserCriteria();
    userCriteria.credentialId = credential.id;
    const user: User = await UserService.findSingleByCriteria(userCriteria);

    if (
        user.deleted === true ||
        credential.enabled === false ||
        !await bcrypt.compare(model.password, credential.password)
    ) {
        throw new InvalidLoginError();
    }

    return genToken({userId: user.id, email: model.email});
}

export async function signup(model: Signup): Promise<User> {
    assert.ok(model.password);

    try {
        await DatabaseService.beginTransaction();

        const token: Token = new Token();
        token.uuid = randomUUID();
        await TokenService.save(token);

        const credential: Credential = new Credential();
        credential.email = model.email;
        credential.password = await bcrypt.hash(model.password, 10);
        credential.token = token;
        await CredentialService.save(credential);

        const user: User = new User();
        user.displayName = model.displayName;
        user.credential = credential;
        await UserService.save(user);

        await DatabaseService.commit();

        return user;
    } catch (e) {
        await DatabaseService.rollback();
        throw e;
    } finally {
        await DatabaseService.release();
    }
}

export async function resetPassword(userId: number, password: string): Promise<void> {
    const userCriteria: UserCriteria = new UserCriteria();
    userCriteria.id = userId;
    userCriteria.fetch = [UserForeignKeys.CREDENTIAL];
    const user: User = await UserService.findSingleByCriteria(userCriteria);

    assert.ok(user.credential);

    user.credential.password = await bcrypt.hash(password, 10);

    await CredentialService.update(user.credential);
}

export async function checkEmail(email: string): Promise<boolean> {
    const credentialCriteria: CredentialCriteria = new CredentialCriteria();
    credentialCriteria.email = email;
    try {
        await CredentialService.findSingleByCriteria(credentialCriteria);
    } catch (e: any) {
        if (e.name === ResourceNotFoundError.NAME) {
            return true;
        } else {
            throw e;
        }
    }
    return false;
}

export async function checkUsername(displayName: string): Promise<boolean> {
    const userCriteria: UserCriteria = new UserCriteria();
    userCriteria.displayName = displayName;
    try {
        await UserService.findSingleByCriteria(userCriteria);
    } catch (e: any) {
        if (e.name === ResourceNotFoundError.NAME) {
            return true;
        } else {
            throw e;
        }
    }
    return false;
}
