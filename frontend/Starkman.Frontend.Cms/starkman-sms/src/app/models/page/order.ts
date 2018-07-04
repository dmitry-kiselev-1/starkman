import { Offer } from './offer';
import { Storageable } from './storageable';
import { Customer } from './customer';

export interface Order extends Storageable{
    date: Date;
    offerList: Offer[];
    customer: Customer,
    note?: string;
}
