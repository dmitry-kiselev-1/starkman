import { OrderStatus } from './order-status';

export interface OrderFilter {
    orderId?: string;
    orderDate?: Date;
    customerPhone?: string,
    status?: number;
}
