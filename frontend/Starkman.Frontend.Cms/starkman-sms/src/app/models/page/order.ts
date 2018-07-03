import { Offer } from './offer';
import { Storageable } from './storageable';

export interface Order extends Storageable{
    date: Date;
    offerList?: Offer[];
}
