import { Storageable } from '../storageable';

export interface Customer extends Storageable {
    name?: string;
    phoneCountryCode?: string;
    phone?: string;
    email?: string;
}
