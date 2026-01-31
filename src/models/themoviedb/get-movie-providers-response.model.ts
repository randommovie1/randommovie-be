export interface Provider {
    logo_path: string | undefined,
    provider_id: number | undefined,
    provider_name: string | undefined,
    display_priority: number | undefined
}

export interface CountryProviders {
    link: string | undefined,
    buy: Provider[] | undefined,
    rent: Provider[] | undefined,
    flatrate: Provider[] | undefined,
    free: Provider[] | undefined,
}

export class GetMovieProvidersResponse {
    public id: number | undefined = undefined;
    public results: Map<string, CountryProviders> | undefined = undefined;

    constructor(object?: any) {
        if (object != null) {
            this.id = object.id;
            this.results = object.results;
        }
    }

}