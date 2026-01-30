export class FindMovieQueryParams {
    /** 38 filters */

    /** use in conjunction with region*/
    public certification?: string;
    /** use in conjunction with region*/
    public 'certification.gte'?: string;
    /**use in conjunction with region*/
    public 'certification.lte'?: string;
    /** use in conjunction with the certification, certification.gte and certification.lte filters  */
    public certification_country?: string;
    /** defaults to false */
    public include_adult?: boolean;
    /** defaults to false */
    public include_video?: boolean;
    /** defaults to en-US */
    public language?: string;
    /** defaults to 1 */
    public page?: number;
    public primary_release_year?: number;
    public 'primary_release_date.gte'?: string;
    public 'primary_release_date.lte'?: string;
    public region?: string;
    public 'release_date.gte'?: string;
    public 'release_date.lte'?: string;
    /** Defaults to popularity.desc */
    public sort_by?: string;
    public 'vote_average.gte'?: number;
    public 'vote_average.lte'?: number;
    public 'vote_count.gte'?: number;
    public 'vote_count.lte'?: number;
    /** use in conjunction with with_watch_monetization_types or with_watch_providers */
    public watch_region?: string;
    /** can be a comma (AND) or pipe (OR) separated query */
    public with_cast?: string;
    /** can be a comma (AND) or pipe (OR) separated query */
    public with_companies?: string;
    /** can be a comma (AND) or pipe (OR) separated query */
    public without_companies?: string;
    /** can be a comma (AND) or pipe (OR) separated query */
    public with_crew?: string;
    /** can be a comma (AND) or pipe (OR) separated query */
    public with_genres?: string;
    /** can be a comma (AND) or pipe (OR) separated query */
    public without_genres?: string;
    /** can be a comma (AND) or pipe (OR) separated query */
    public with_keywords?: string;
    /** can be a comma (AND) or pipe (OR) separated query */
    public without_keywords?: string;
    /** use in conjunction with watch_region, can be a comma (AND) or pipe (OR) separated query */
    public with_watch_providers?: string;
    /** use in conjunction with watch_region, can be a comma (AND) or pipe (OR) separated query */
    public without_watch_providers?: string;
    /** can be a comma (AND) or pipe (OR) separated query */
    public with_people?: string;
    public with_origin_country?: string;
    public with_original_language?: string;
    /** possible values are: [1, 2, 3, 4, 5, 6] can be a comma (AND) or pipe (OR) separated query, can be used in conjunction with region */
    public with_release_type?: number;
    public 'with_runtime.gte'?: number;
    public 'with_runtime.lte'?: number;
    /** possible values are: [flatrate, free, ads, rent, buy] use in conjunction with watch_region, can be a comma (AND) or pipe (OR) separated query */
    public with_watch_monetization_types?: string;
    public year?: number;

    constructor(object?: any) {
        if (object != null) {
            this.certification = object.certification;
            this['certification.gte'] = object['certification.gte']
            this['certification.lte'] = object['certification.lte'];
            this.certification_country = object.certification_country;
            this.include_adult = object.include_adult;
            this.include_video = object.include_video;
            this.language = object.language;
            this.page = object.page;
            this.primary_release_year = object.primary_release_year;
            this['primary_release_date.gte'] = object['primary_release_date.gte'];
            this['primary_release_date.lte'] = object['primary_release_date.lte'];
            this.region = object.region;
            this['release_date.gte'] = object['release_date.gte'];
            this['release_date.lte'] = object['release_date.lte'];
            this.sort_by = object.sort_by;
            this['vote_average.gte'] = object['vote_average.gte'];
            this['vote_average.lte'] = object['vote_average.lte'];
            this['vote_count.gte'] = object['vote_count.gte'];
            this['vote_count.lte'] = object['vote_count.lte'];
            this.watch_region = object.watch_region;
            this.with_cast = object.with_cast;
            this.with_companies = object.with_companies;
            this.without_companies = object.without_companies;
            this.with_crew = object.with_crew;
            this.with_genres = object.with_genres;
            this.without_genres = object.without_genres;
            this.with_keywords = object.with_keywords;
            this.without_keywords = object.without_keywords;
            this.with_watch_providers = object.with_watch_providers
            this.without_watch_providers = object.without_watch_providers;
            this.with_people = object.with_people
            this.with_origin_country = object.with_origin_country;
            this.with_original_language = object.with_original_language;
            this.with_release_type = object.with_release_type
            this['with_runtime.gte'] = object['with_runtime.gte'];
            this['with_runtime.lte'] = object['with_runtime.lte'];
            this.with_watch_monetization_types = object.with_watch_monetization_types;
            this.year = object.year
        }
    }

}