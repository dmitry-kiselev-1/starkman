import { Storageable } from '../storageable';
import { Customer } from './customer';
import { OrderStatus } from './order-status';
import { Product } from '../page/product';

export interface Order extends Storageable{
    date: Date;
    time?: Date;
    productList: Product[];
    customer: Customer,
    comment?: string;
    status: OrderStatus;

    filterOrderDate?: string;
    filterCustomerPhone?: string;
}
