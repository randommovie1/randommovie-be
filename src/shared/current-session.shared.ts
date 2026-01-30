import {Session, SessionData} from "express-session";

export class CurrentSession {
    private static instance: CurrentSession | undefined = undefined;
    private _session: Session & Partial<SessionData> | undefined = undefined;

    private constructor() {
    }

    public static getInstance(): CurrentSession {
        if (this.instance == null) {
            this.instance = new CurrentSession();
        }
        return this.instance;
    }

    public getUserId(): number | undefined {
        return this.session?.userId;
    }

    set session(session: Session & Partial<SessionData>) {
        this._session = session;
    }

    get session(): Session & Partial<SessionData> | undefined {
        return this._session;
    }

    get country(): string {
        return this._session?.country ?? 'IT';
    }

}