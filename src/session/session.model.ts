import {FindMovieQueryParams} from "../models/themoviedb/find-movie-query-params.model";

declare module 'express-session' {
    interface SessionData {
        userId: number;
        queryParams: FindMovieQueryParams;
        totalPages: number,
        // Use CurrentSession.getCurrentSession().country to get session country
        country: string
    }
}
