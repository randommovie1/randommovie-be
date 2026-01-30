export class InvalidLoginError extends Error {
    public static readonly NAME: string = '[InvalidLoginError]'

    public name: string = InvalidLoginError.NAME;
    public message: string = 'Invalid login.';

}