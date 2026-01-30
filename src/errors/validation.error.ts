export class ValidationError extends Error {
    public static readonly NAME: string = '[ValidationError]'

    public name: string = ValidationError.NAME;
    public message: string = 'Validation error.';

}