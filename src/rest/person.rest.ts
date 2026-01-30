import {Person} from "../models/person.model";
import {app} from "../server";
import assert from "assert";
import * as TheMovieDbService from "../services/the-movie-db.service";
import {asyncHandler} from "../configs/middleware.config";

const PATH: string = 'person'

export function setup(): void {
    app.get(`/${PATH}/actors`, asyncHandler(async (req, res) => {
        const name: string = req.query.name as unknown as string;
        const result: Person[] = await TheMovieDbService.doSearchPerson(name);
        res.json(filterPersons(result, 'Acting'));
    }))

    app.get(`/${PATH}/directors`, asyncHandler(async (req, res) => {
        const name: string = req.query.name as unknown as string;
        const result: Person[] = await TheMovieDbService.doSearchPerson(name);
        res.json(filterPersons(result, 'Directing'));
    }))
}

function filterPersons(persons: Person[], by: string): Person[] {
    return persons.filter(person => {
        assert.ok(person.popularity);
        return person.known_for_department === by && person.popularity > 1;
    })
}
