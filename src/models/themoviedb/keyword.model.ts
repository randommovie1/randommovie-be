export class Keyword {
    public id: number | undefined = undefined;
    public name: string | undefined = undefined;

    constructor(object?: any) {
        if (object != null) {
            this.id = object.id;
            this.name = object.name;
        }
    }


}