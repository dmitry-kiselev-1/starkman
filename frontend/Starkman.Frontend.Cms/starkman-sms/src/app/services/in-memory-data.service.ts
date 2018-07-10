import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';
import { DateService } from './date.service';
import { Category } from '../models/page/category';
import { Product } from '../models/page/product';
import { Photo } from '../models/page/photo';
import { Order } from '../models/order/order';
import { Offer } from '../models/order/offer';
import { Customer } from '../models/order/customer';
import { OrderStatus } from '../models/order/order-status';
import { Filter } from '../models/order/filter';
import * as _moment from 'moment';
import * as _lodash from 'lodash';

/*
  GET api/categories                    // all categories
  GET api/categories/42                 // the category with id=42
  GET api/categories?propertyName=^j    // 'j' is a regexPattern; returns heroes whose name starting with 'j' or 'J'
  GET api/categories.json/42            // ignores the ".json"
*/

@Injectable()
export class InMemoryDataService implements InMemoryDbService {

    constructor(private dateService: DateService) {
    }

    createDb() {

        let products: Product[] = [];
        let categories: Category[] =
            [
                { url: 'bryuki_casual', title: 'Брюки кажуал' },
                { url: 'bryuki_klassika', title: 'Брюки классика' },
                { url: 'bryuki_zauzhennye', title: 'Брюки зауженные' },
                { url: 'bryuki_detskie', title: 'Брюки детские' },
                { url: 'kostyumy_pritalennye', title: 'Костюмы приталенные' },
                { url: 'kostyumy_detskie', title: 'Костюмы для мальчиков' },
                { url: 'pidzhaki_klassika', title: 'Пиджаки классика' },
                { url: 'pidzhaki_pritalennye', title: 'Пиджаки приталенные' }
            ] as Category[];

        categories.forEach((category, index) =>
        {
            category.id = category.url;
            category.sortOrder = index + 1;
            category.isVisible = true;
            category.description = `Description (${category.title})`;
            category.metaKeywords = `MetaKeywords (${category.title})`;
            category.metaDescription = `MetaDescription (${category.title})`;
            category.isVisible = true;
            category.photo = {
                url: `${category.url}_photo`,
                title: `${category.title} photo`,
                type: "type",
                size: 0,
                binaryString: "binaryString",
                base64String: "base64String",
                sortOrder: 0,
                isVisible: true
            } as Photo;

            let productList = [];
            let productCount = this.randomBetween(0, 5);

            for (let p = 1; p <= productCount; p++)
            {
                let photoList = [];
                let offerList = [];
                let filterList = [];

                let photoCount = this.randomBetween(0, 5);
                let offerCount = this.randomBetween(0, 5);
                let filterCount = this.randomBetween(0, 5);

                for (let ph = 1; ph <= photoCount; ph++) {
                    photoList.push(
                        {
                            id:  `${category.url}_product_${p}_photo_${ph}`,
                            url: `${category.url}_product_${p}_photo_${ph}`,
                            title: `${category.title} product ${p} photo ${ph}`,
                            type: `type`,
                            size: 0,
                            binaryString: `binaryString`,
                            base64String: `base64String`,
                            sortOrder: ph,
                            isVisible: true
                        } as Photo
                    );
                }

                for (let o = 1; o <= offerCount; o++) {
                    offerList.push(
                        {
                            id: `offer_${o}`,
                            count: this.randomBetween(1, 10),
                            price: this.randomBetween(1000, 5000),
                            size: this.randomBetween(1, 10),
                            height: this.randomBetween(150, 200)
                        } as Offer
                    );
                }

                for (let f = 1; f <= filterCount; f++) {
                    filterList.push(
                        {
                            id: `filter_${f}`,
                            name: `name_${f}`,
                            value: `value_${f}`
                        } as Filter
                    );
                }

                let product =
                    {
                        id:  (index * 10 + p).toString(),
                        url: `${category.url}_product_${p}`,
                        urlParent: category.url,
                        title: `Product ${p} (${category.title})`,
                        description: `Description ${p} (${category.title})`,
                        metaKeywords: `MetaKeywords ${p} (${category.title})`,
                        metaDescription: `MetaDescription ${p} (${category.title})`,
                        sortOrder: p,
                        isVisible: true,
                        price: this.randomBetween(500, 5000),
                        photoList: photoList,
                        offerList: offerList,
                        filterList: filterList
                    } as Product;

                productList.push(product);
                products.push(product);
            }

            category.productList = productList;
        });

        let orders: Order[] = [];
        let orderCount = this.randomBetween(1, 10);

        for (let o = 1; o <= orderCount; o++) {

            let orderProductList = [];
            let orderProductCount = this.randomBetween(1, 10);

            for (let p = 1; p <= orderProductCount; p++) {
                orderProductList.push(products[this.randomBetween(0, products.length - 1)]);
            }

            let day = this.randomBetween(10, 28);
            let date = this.dateService.toDate(`2018-01-${day}T00.00.00.000`);
            let time = this.dateService.toDate(`2018-01-${day}T${this.randomBetween(10, 23)}.${this.randomBetween(10, 59)}.${this.randomBetween(10, 59)}.000`);
            let phone = this.randomBetween(9252668815, 9259999999);
            orders.push(
                {
                    id: `${100 * o}`,
                    date: date,
                    time: time,
                    customer: {id: `customer_${o}`, email: `email_${o}`, phoneCountryCode: `+7`, phone: `${phone}`, name: `name_${o}`} as Customer,
                    comment: `note_${o}`,
                    status: this.randomBetween(0, 1), //OrderStatus.New,
                    productList: orderProductList as Product[],

                    filterOrderDate: this.dateService.toString(date, true),
                    filterCustomerPhone: phone.toString()
                } as Order
            )
        }

        //debugger;
        return {categories, orders};
    }

    // Id generator
    genId<T extends { id: any }>(collection: T[], collectionName: string): any {
        if (collectionName === '') {
            console.log('genId override for new guid');
            return this.guid();
        } else if (collection) {
            console.log(`genId override for '${collectionName}'`);
            return 1 + collection.reduce((prev, curr) => Math.max(prev, curr.id || 0), 1000);
        }
    }

    // Pseudo guid generator
    guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }

        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }

    randomBetween(min, max): number {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}
