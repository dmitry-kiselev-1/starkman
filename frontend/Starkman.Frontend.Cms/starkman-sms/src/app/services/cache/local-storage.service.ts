import { Injectable } from "@angular/core";
import { CacheService } from "./cache.service";

@Injectable()
export class LocalStorageService<T> implements CacheService<T> {

    private promises = {};

    public getOrAdd(key: string, fillData: () => Promise<T>): Promise<T> {
        let entityData: string = localStorage.getItem(key);
        if (entityData)
            return Promise.resolve(JSON.parse(entityData));

        let promise = this.promises[key];
        if (promise)
            return promise;

        return this.promises[key] = fillData().then(x => {
            localStorage.setItem(key, JSON.stringify(x));
            delete this.promises[key];
            return x;
        });
    }

    public set(key: string, data: T): Promise<void> {
        return Promise.resolve(localStorage.setItem(key, JSON.stringify(data)));
    }

    public clear(key: string): Promise<void> {
        return Promise.resolve(localStorage.removeItem(key));
    }

    public clearAll(): Promise<void> {
        return Promise.resolve(localStorage.clear());
    }
}

