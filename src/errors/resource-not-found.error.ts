export class ResourceNotFoundError extends Error {
    public static readonly NAME: string = '[ResourceNotFoundError]'

    public name: string = ResourceNotFoundError.NAME;
    public message: string = 'Resource not found.';

}