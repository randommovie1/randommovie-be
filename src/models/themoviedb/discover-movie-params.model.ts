/**
 * Rappresenta i parametri di ricerca per l'endpoint /discover/movie di TMDB.
 * @see https://developer.themoviedb.org/reference/discover-movie
 */
export class DiscoverMovieParams {
    /** Filter results with a specific certification. Use in conjunction with region. */
    certification?: string;

    /** Filter results with a certification greater than or equal to the value. Use in conjunction with region. */
    "certification.gte"?: string;

    /** Filter results with a certification less than or equal to the value. Use in conjunction with region. */
    "certification.lte"?: string;

    /** Filter results with a specific certification country. Use in conjunction with certification filters. */
    certification_country?: string;

    /** Whether to include adult (pornographic) content in the results. */
    include_adult: boolean = false;

    /** Whether to include video content in the results. */
    include_video: boolean = false;

    /** ISO 639-1 code to expose translations of titles and overviews. */
    language: string = "en-US";

    /** Specify which page to query. */
    page: number = 1;

    /** Filter results with a specific primary release year. */
    primary_release_year?: number;

    /** Filter results with a primary release date greater than or equal to the value. */
    "primary_release_date.gte"?: string;

    /** Filter results with a primary release date less than or equal to the value. */
    "primary_release_date.lte"?: string;

    /** ISO 3166-1 code to filter release dates. Must be uppercase. */
    region?: string;

    /** Filter results with a release date greater than or equal to the value. */
    "release_date.gte"?: string;

    /** Filter results with a release date less than or equal to the value. */
    "release_date.lte"?: string;

    /** Choose from a list of allowed sort options. */
    sort_by:
        | "original_title.asc" | "original_title.desc"
        | "popularity.asc" | "popularity.desc"
        | "revenue.asc" | "revenue.desc"
        | "primary_release_date.asc" | "primary_release_date.desc"
        | "title.asc" | "title.desc"
        | "vote_average.asc" | "vote_average.desc"
        | "vote_count.asc" | "vote_count.desc" = "popularity.desc";

    /** Filter results with a vote average greater than or equal to the value. */
    "vote_average.gte"?: number;

    /** Filter results with a vote average less than or equal to the value. */
    "vote_average.lte"?: number;

    /** Filter results with a vote count greater than or equal to the value. */
    "vote_count.gte"?: number;

    /** Filter results with a vote count less than or equal to the value. */
    "vote_count.lte"?: number;

    /** ISO 3166-1 code to filter watch providers. Use with with_watch_monetization_types or with_watch_providers. */
    watch_region?: string;

    /** A comma (AND) or pipe (OR) separated list of person IDs to filter by cast members. */
    with_cast?: string;

    /** A comma (AND) or pipe (OR) separated list of company IDs to filter by. */
    with_companies?: string;

    /** A comma (AND) or pipe (OR) separated list of person IDs to filter by crew members. */
    with_crew?: string;

    /** A comma (AND) or pipe (OR) separated list of genre IDs to filter by. */
    with_genres?: string;

    /** A comma (AND) or pipe (OR) separated list of keyword IDs to filter by. */
    with_keywords?: string;

    /** Filter results by country of origin. */
    with_origin_country?: string;

    /** Filter results by original language. */
    with_original_language?: string;

    /** A comma (AND) or pipe (OR) separated list of person IDs to filter by. */
    with_people?: string;

    /** * Filter results by release type. 1: Premiere, 2: Limited Showings, 3: Theatrical,
     * 4: Digital, 5: Physical, 6: TV. Can be AND/OR.
     */
    with_release_type?: string;

    /** Filter results with a runtime greater than or equal to the value. */
    "with_runtime.gte"?: number;

    /** Filter results with a runtime less than or equal to the value. */
    "with_runtime.lte"?: number;

    /** Filter results by watch monetization types. Possible: flatrate, free, ads, rent, buy. */
    with_watch_monetization_types?: string;

    /** A comma (AND) or pipe (OR) separated list of watch provider IDs. */
    with_watch_providers?: string;

    /** A comma (AND) or pipe (OR) separated list of company IDs to exclude. */
    without_companies?: string;

    /** A comma (AND) or pipe (OR) separated list of genre IDs to exclude. */
    without_genres?: string;

    /** A comma (AND) or pipe (OR) separated list of keyword IDs to exclude. */
    without_keywords?: string;

    /** A comma (AND) or pipe (OR) separated list of watch provider IDs to exclude. */
    without_watch_providers?: string;

    /** Filter results by a specific year. */
    year?: number;

    /** A custom param to avoid server caching */
    uuid?: string;

    constructor(obj?: any) {
        if (obj != null) {
            this.certification = obj.certification;
            this["certification.gte"] = obj["certification.gte"];
            this["certification.lte"] = obj["certification.lte"];
            this.certification_country = obj.certification_country;
            this.include_adult = obj.include_adult ?? this.include_adult;
            this.include_video = obj.include_video ?? this.include_video;
            this.language = obj.language ?? this.language;
            this.page = obj.page ?? this.page;
            this.primary_release_year = obj.primary_release_year;
            this["primary_release_date.gte"] = obj["primary_release_date.gte"];
            this["primary_release_date.lte"] = obj["primary_release_date.lte"];
            this.region = obj.region;
            this["release_date.gte"] = obj["release_date.gte"];
            this["release_date.lte"] = obj["release_date.lte"];
            this.sort_by = obj.sort_by ?? this.sort_by;
            this["vote_average.gte"] = obj["vote_average.gte"];
            this["vote_average.lte"] = obj["vote_average.lte"];
            this["vote_count.gte"] = obj["vote_count.gte"];
            this["vote_count.lte"] = obj["vote_count.lte"];
            this.watch_region = obj.watch_region;
            this.with_cast = obj.with_cast;
            this.with_companies = obj.with_companies;
            this.with_crew = obj.with_crew;
            this.with_genres = obj.with_genres;
            this.with_keywords = obj.with_keywords;
            this.with_origin_country = obj.with_origin_country;
            this.with_original_language = obj.with_original_language;
            this.with_people = obj.with_people;
            this.with_release_type = obj.with_release_type;
            this["with_runtime.gte"] = obj["with_runtime.gte"];
            this["with_runtime.lte"] = obj["with_runtime.lte"];
            this.with_watch_monetization_types = obj.with_watch_monetization_types;
            this.with_watch_providers = obj.with_watch_providers;
            this.without_companies = obj.without_companies;
            this.without_genres = obj.without_genres;
            this.without_keywords = obj.without_keywords;
            this.without_watch_providers = obj.without_watch_providers;
            this.year = obj.year;
            this.uuid = obj.uuid;
        }
    }
}