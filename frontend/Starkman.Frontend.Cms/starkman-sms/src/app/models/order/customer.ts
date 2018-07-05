import { Storageable } from '../storageable';

export interface Customer extends Storageable{
    name?: string;
    phone?: string;
    email?: string;
}
