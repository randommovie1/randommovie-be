/**
 * Rappresenta i dettagli completi di un film.
 * @see https://developer.themoviedb.org/reference/movie-details
 */
export class TheMovieDbMovie {
    /** Whether the movie is for an adult audience. */
    adult: boolean = true;

    /** The path to the backdrop image. */
    backdrop_path?: string;

    /** If the movie belongs to a collection, this will contain the collection details. */
    belongs_to_collection?: any;

    /** The budget of the movie in USD. */
    budget: number = 0;

    /** The list of genres associated with the movie. */
    genres: { id: number; name: string }[] = [];

    /** The URL to the movie's official homepage. */
    homepage?: string;

    /** The unique identifier for the movie. */
    id: number = 0;

    /** The IMDB ID for the movie. */
    imdb_id?: string;

    /** The original language of the movie. */
    original_language?: string;

    /** The original title of the movie. */
    original_title?: string;

    /** A brief summary of the movie. */
    overview?: string;

    /** Popularity score of the movie. */
    popularity: number = 0;

    /** The path to the movie's poster image. */
    poster_path?: string;

    /** The production companies involved in the movie. */
    production_companies: { id: number; logo_path: string; name: string; origin_country: string }[] = [];

    /** The countries where the movie was produced. */
    production_countries: { iso_3166_1: string; name: string }[] = [];

    /** The release date of the movie (YYYY-MM-DD). */
    release_date?: string;

    /** The total revenue of the movie in USD. */
    revenue: number = 0;

    /** The duration of the movie in minutes. */
    runtime: number = 0;

    /** The languages spoken in the movie. */
    spoken_languages: { english_name: string; iso_639_1: string; name: string }[] = [];

    /** The status of the movie (e.g., Released, Rumored, Post Production). */
    status?: string;

    /** The tagline or slogan of the movie. */
    tagline?: string;

    /** The title of the movie. */
    title?: string;

    /** Indicates if there is a video associated with this movie. */
    video: boolean = true;

    /** Average vote score. */
    vote_average: number = 0;

    /** Total number of votes. */
    vote_count: number = 0;

    constructor(obj?: any) {
        if (obj != null) {
            this.adult = obj.adult ?? this.adult;
            this.backdrop_path = obj.backdrop_path;
            this.belongs_to_collection = obj.belongs_to_collection;
            this.budget = obj.budget ?? this.budget;
            this.genres = obj.genres ?? [];
            this.homepage = obj.homepage;
            this.id = obj.id ?? this.id;
            this.imdb_id = obj.imdb_id;
            this.original_language = obj.original_language;
            this.original_title = obj.original_title;
            this.overview = obj.overview;
            this.popularity = obj.popularity ?? this.popularity;
            this.poster_path = obj.poster_path;
            this.production_companies = obj.production_companies ?? [];
            this.production_countries = obj.production_countries ?? [];
            this.release_date = obj.release_date;
            this.revenue = obj.revenue ?? this.revenue;
            this.runtime = obj.runtime ?? this.runtime;
            this.spoken_languages = obj.spoken_languages ?? [];
            this.status = obj.status;
            this.tagline = obj.tagline;
            this.title = obj.title;
            this.video = obj.video ?? this.video;
            this.vote_average = obj.vote_average ?? this.vote_average;
            this.vote_count = obj.vote_count ?? this.vote_count;
        }
    }
}

/**
 * Rappresenta la risposta completa restituita da /discover/movie.
 * @see https://developer.themoviedb.org/reference/discover-movie
 */
export class DiscoverMovieResponse {
    /** The current page of results. */
    page: number = 0;

    /** The list of movie results. */
    results: TheMovieDbMovie[] = [];

    /** Total number of pages available. */
    total_pages: number = 0;

    /** Total number of results available across all pages. */
    total_results: number = 0;

    constructor(obj?: any) {
        if (obj != null) {
            this.page = obj.page ?? this.page;
            this.total_pages = obj.total_pages ?? this.total_pages;
            this.total_results = obj.total_results ?? this.total_results;

            if (Array.isArray(obj.results)) {
                this.results = obj.results.map((m: any) => new TheMovieDbMovie(m));
            } else {
                this.results = [];
            }
        }
    }
}