import {DiscoverMovieParams} from "../models/themoviedb/discover-movie-params.model";

declare module 'express-session' {
    interface SessionData {
        userId: number | undefined;
        queryParams: DiscoverMovieParams| undefined;
        // Questo campo memorizza il numero di pagine totali per la queryParams.
        totalPages: number | undefined,
        country: string | undefined,
    }
}
