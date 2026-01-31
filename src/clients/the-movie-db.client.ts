import {GetMovieCreditsResponse} from '../models/themoviedb/get-movie-credits-response.model';
import {SearchPersonResponse} from '../models/themoviedb/search-person-response.model';
import {Person} from '../models/person.model';
import {Keyword} from '../models/themoviedb/keyword.model';
import {SearchKeywordResponse} from '../models/themoviedb/search-keyword-response.model';
import {GetMovieProvidersResponse} from '../models/themoviedb/get-movie-providers-response.model';
import axios from 'axios';
import assert from 'assert';
import {CurrentSession} from "../shared/current-session.shared";
import {getLanguageFromCountryCode} from "../utils/location.utils";
import {GetMovieVideosResponse} from "../models/themoviedb/get-movie-videos-response.model";
import {DiscoverMovieParams} from "../models/themoviedb/discover-movie-params.model";
import {DiscoverMovieResponse, TheMovieDbMovie} from "../models/themoviedb/discover-movie-response.model";
import * as MovieService from "../services/movie.service";
import {getRandomNumber} from "../utils/math.utils";

const AUTH: string = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMTQwZTczZTBmYjBjM2Y4NDM2NTliZTVkYzgwOGIyOSIsIm5iZiI6MTcyMjg3NDQwNS4zNzEyMiwic3ViIjoiNjZiMGY4N2VmY2QwMTlkODk5ZjQ4ZmYxIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.ALVzLp8MT3l9TkMZhgy0J9E2BWqyDh1Wb-7B0hgzhqY';
/** max page themovedb can accept */
const MAX_ITERATE_PAGES: number = 10;

export async function getMovieProviders(id: number): Promise<GetMovieProvidersResponse> {
    assert.ok(id);

    const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}/watch/providers`, {
        params: {
            language: 'it-IT'
        },
        headers: {
            'Authorization': 'Bearer ' + AUTH,
            'accept': 'application/json'
        }
    });

    return new GetMovieProvidersResponse(response.data);
}

export async function discoverMovie(params: DiscoverMovieParams): Promise<DiscoverMovieResponse> {
    const response = await axios.get('https://api.themoviedb.org/3/discover/movie', {
        params: params,
        headers: {
            'Authorization': 'Bearer ' + AUTH,
            'Accept': 'application/json'
        }
    });

    return new DiscoverMovieResponse(response.data);
}

export async function doSearchPerson(name: string): Promise<Person[]> {
    const persons: Person[] = [];
    let page: number = 1;
    const response: SearchPersonResponse = await doSearchPersonByPage(name, page);
    persons.push(...response.results);

    assert.ok(response.total_pages);

    if (response.total_pages > 1) {
        while (page < MAX_ITERATE_PAGES) {
            if (page > response.total_pages) {
                break;
            }
            page++;
            persons.push(...((await doSearchPersonByPage(name, page)).results));
        }
    }
    return persons;
}

async function doSearchPersonByPage(name: string, page: number): Promise<SearchPersonResponse> {
    assert.ok(name);

    const response = await axios.get('https://api.themoviedb.org/3/search/person', {
        params: {
            query: name,
            page: page,
            language: 'it-IT'
        },
        headers: {
            'Authorization': 'Bearer ' + AUTH,
            'Accept': 'application/json'
        }
    });
    return new SearchPersonResponse(response.data);
}

export async function getMovieCredits(id: number): Promise<GetMovieCreditsResponse> {
    assert.ok(id);

    const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits`, {
        params: {
            language: 'it-IT'
        },
        headers: {
            'Authorization': 'Bearer ' + AUTH,
            'Accept': 'application/json'
        }
    });

    return new GetMovieCreditsResponse(response.data);
}

export async function getMovieDetails(id: number | undefined): Promise<TheMovieDbMovie> {
    assert.ok(id);
    const sessionCountry: string = CurrentSession.getInstance().country;
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
        params: {
            language: getLanguageFromCountryCode(sessionCountry)
        },
        headers: {
            'Authorization': 'Bearer ' + AUTH,
            'Accept': 'application/json'
        }
    });
    return new TheMovieDbMovie(response.data);
}

export async function doSearchKeywords(name: string): Promise<Keyword[]> {
    const keywords: Keyword[] = [];
    let page: number = 1;
    const response: SearchKeywordResponse = await doSearchKeywordsByPage(name, page);
    keywords.push(...response.results);

    assert.ok(response.total_pages);

    if (response.total_pages > 1) {
        while (page < MAX_ITERATE_PAGES) {
            if (page > response.total_pages) {
                break;
            }
            page++;
            keywords.push(...((await doSearchKeywordsByPage(name, page)).results));
        }
    }
    return keywords;
}

async function doSearchKeywordsByPage(name: string, page: number): Promise<SearchKeywordResponse> {
    assert.ok(name);

    const sessionCountry: string = CurrentSession.getInstance().country;

    const response = await axios.get('https://api.themoviedb.org/3/search/keyword', {
        params: {
            query: name,
            page: page,
            language: getLanguageFromCountryCode(sessionCountry)
        },
        headers: {
            'Authorization': 'Bearer ' + AUTH,
            'Accept': 'application/json'
        }
    });
    return new SearchKeywordResponse(response.data);
}

export async function getMovieVideos(id: number, lang?: string): Promise<GetMovieVideosResponse> {
    assert.ok(id);

    const sessionCountry: string = CurrentSession.getInstance().country;

    const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}/videos`, {
        params: {
            language: lang ?? getLanguageFromCountryCode(sessionCountry)
        },
        headers: {
            'Authorization': 'Bearer ' + AUTH,
            'Accept': 'application/json'
        }
    });
    return new GetMovieVideosResponse(response.data);
}

export async function getMoviePoster(path: string): Promise<string> {
    const response = await axios.get(`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${path}`, {
        responseType: 'arraybuffer',
        headers: {
            'Accept': 'image/*'
        }
    });
    return Buffer.from(response.data, 'binary').toString('base64');
}

export async function findMovie(params: DiscoverMovieParams): Promise<TheMovieDbMovie | undefined> {
    let result: TheMovieDbMovie | undefined = undefined;

    let response: DiscoverMovieResponse = await discoverMovie(params);

    if (response && response.total_results && response.total_results > 0) {
        const userId: number | undefined = CurrentSession.getInstance().getUserId();

        // If user is logged then...
        if (userId) {
            // Retrive user's ignored movie list
            const ignoredMovieIds: (number | undefined)[] = await MovieService.getUserIgnoredMovies(userId).then(res => res.map(i => i.externalId));

            for (const _movie of response.results) {
                if (!ignoredMovieIds.includes(_movie.id)) {
                    result = _movie;
                    break;
                }
            }
        } else {
            // Picks a random movie from results
            result = response.results[getRandomNumber(response.results.length)];
        }
    }
    return result;
}