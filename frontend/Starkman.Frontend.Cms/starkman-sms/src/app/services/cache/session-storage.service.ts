import { Injectable } from "@angular/core";
import { CacheService } from "./cache.service";

@Injectable()
export class SessionStorageService<T> implements CacheService<T> {

    private promises = {};

    public getOrAdd(key: string, fillData: () => Promise<T>): Promise<T> {
        let entityData: string = sessionStorage.getItem(key);
        if (entityData)
            return Promise.resolve(JSON.parse(entityData));

        let promise = this.promises[key];
        if (promise)
            return promise;

        return this.promises[key] = fillData().then(x => {
            sessionStorage.setItem(key, JSON.stringify(x));
            delete this.promises[key];
            return x;
        });
    }

    public set(key: string, data: T): Promise<void> {
        return Promise.resolve(sessionStorage.setItem(key, JSON.stringify(data)));
    }

    public clear(key: string): Promise<void> {
        return Promise.resolve(sessionStorage.removeItem(key));
    }

    public clearAll(): Promise<void> {
        return Promise.resolve(sessionStorage.clear());
    }
}

