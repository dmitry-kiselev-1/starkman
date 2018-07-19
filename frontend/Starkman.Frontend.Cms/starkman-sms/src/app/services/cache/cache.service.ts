export interface CacheService<T> {
    getOrAdd(key: string, fillData: () => Promise<T>): Promise<T>;
    set(key: string, data: T): Promise<void>;
    clear(key: string): Promise<void>;
    clearAll(): Promise<void>;
}
