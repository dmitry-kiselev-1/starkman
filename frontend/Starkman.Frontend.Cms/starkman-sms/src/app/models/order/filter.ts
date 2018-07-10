import { Storageable } from '../storageable';

export interface Filter extends Storageable {
    name: string;
    value: string;
}
