import { Person } from '../person.model';

export class SearchPersonResponse {
    public page: number | undefined = undefined;
    public results: Person[] = [];
    public total_pages: number | undefined = undefined;
    public total_results: number | undefined = undefined;

    constructor(object?: any) {
        if (object != null) {
            this.page = object.page;
            this.results = object.results != null ? object.results.map((i: any) => new Person(i)) : [];
            this.total_pages = object.total_pages;
            this.total_results = object.total_results;
        }
    }
}