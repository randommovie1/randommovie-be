export class Person {
    public id: number | undefined = undefined;
    public name: string | undefined = undefined;
    public known_for_department: string | undefined = undefined;
    public popularity: number | undefined = undefined;
    public character: string | undefined = undefined;
    public profile_path: string | undefined = undefined;
    public job: string | undefined = undefined;

    constructor(object?: any) {
        if (object != null) {
            this.id = object.id;
            this.name = object.name;
            this.known_for_department = object.known_for_department;
            this.popularity = object.popularity;
            this.character = object.character;
            this.profile_path = object.profile_path;
            this.job = object.job;
        }
    }
}