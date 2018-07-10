import { Storageable } from '../storageable';
import { Customer } from './customer';
import { OrderStatus } from './order-status';
import { Product } from '../page/product';
import { Offer } from './offer';

export interface Order extends Storageable{
    date: Date;
    time?: Date;
    offerList?: Offer[];
    customer: Customer,
    comment?: string;
    status: OrderStatus;

    filterOrderDate?: string;
    filterCustomerPhone?: string;
}
