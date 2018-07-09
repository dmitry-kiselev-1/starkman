import { Storageable } from '../storageable';
import { Offer } from './offer';
import { Customer } from './customer';
import { OrderStatus } from './order-status';
import { Time } from '@angular/common';

export interface Order extends Storageable{
    date: Date;
    time?: Date;
    offerList: Offer[];
    customer: Customer,
    comment?: string;
    status: OrderStatus;

    filterOrderDate?: string;
    filterCustomerPhone?: string;
}
