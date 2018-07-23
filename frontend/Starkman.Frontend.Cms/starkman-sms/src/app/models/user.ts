import { Storageable } from './storageable';

export interface User extends Storageable {
    name?: string;
    login: string;
    password: string;
}
