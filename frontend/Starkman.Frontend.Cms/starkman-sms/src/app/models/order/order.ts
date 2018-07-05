import { Storageable } from '../storageable';
import { Offer } from './offer';
import { Customer } from './customer';
import { OrderStatus } from './order-status';

export interface Order extends Storageable{
    date: Date;
    offerList: Offer[];
    customer: Customer,
    comment?: string;
    status: OrderStatus;
}
