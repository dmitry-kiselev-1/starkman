import { Injectable } from '@angular/core';
import { CacheService } from './cache.service';

const resolved = Promise.resolve();

@Injectable()
export class MemoryCacheService<T> implements CacheService<T> {

    private cache = {};

    public getOrAdd(key: string, fillData: () => Promise<T>): Promise<T> {
        return this.cache[key] || (this.cache[key] = fillData());
    }

    public set(key: string, data: T): Promise<void> {
        this.cache[key] = Promise.resolve(data);
        return resolved;
    }

    public clear(key: string): Promise<void> {
        delete this.cache[key];
        return resolved;
    }

    public clearAll(): Promise<void> {
        this.cache = {};
        return resolved;
    }
}
