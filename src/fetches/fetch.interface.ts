export interface FetchInterface<T> {

    handle(keys: string[], model: T): Promise<T>;

}