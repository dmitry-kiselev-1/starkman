import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';
import { DateService } from './date.service';
import { Category } from '../models/page/category';
import { Product } from '../models/page/product';
import { Photo } from '../models/page/photo';
import { Order } from '../models/page/order';
import { Offer } from '../models/page/offer';
import * as moment from 'moment';
import { Customer } from '../models/page/customer';

/*
  GET api/categories          // all categories
  GET api/categories/42       // the category with id=42
  GET api/categories?propertyName=^j  // 'j' is a regexPattern; returns heroes whose name starting with 'j' or 'J'
  GET api/categories.json/42  // ignores the ".json"
*/

@Injectable()
export class InMemoryDataService implements InMemoryDbService {

    constructor(private dateService: DateService) {
    }

    createDb() {

        //let products: Product[] = [];
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
                sortOrder: 1,
                isVisible: true
            } as Photo;

            let photoList = [];
            let productList = [];

            let photoCount = this.randomBetween(0, 5);
            let productCount = this.randomBetween(0, 5);

            for (let i = 1; i <= productCount; i++)
            {
                for (let ii = 1; i <= photoCount; i++) {
                    photoList.push(
                        {
                            id:  `${category.url}_product_${i}_photo_${ii}`,
                            url: `${category.url}_product_${i}_photo_${ii}`,
                            title: `${category.title} product ${i} photo ${ii}`,
                            type: `type`,
                            size: 0,
                            binaryString: `binaryString`,
                            base64String: `base64String`,
                            sortOrder: ii,
                            isVisible: true
                        } as Photo
                    );
                }

                let product =
                    {
                        id:  `${category.url}_product_${i}`,
                        url: `${category.url}_product_${i}`,
                        urlParent: category.url,
                        title: `Product ${i} (${category.title})`,
                        description: `Description ${i} (${category.title})`,
                        metaKeywords: `MetaKeywords ${i} (${category.title})`,
                        metaDescription: `MetaDescription ${i} (${category.title})`,
                        sortOrder: i,
                        isVisible: true,
                        sku: i*(productCount/10)*10 + index,
                        price: this.randomBetween(500, 5000),
                        photoList: photoList
                    } as Product;

                productList.push(product);
                //products.push(product);

                category.productList = productList;
            }
        });

        let orders: Order[] = [];
        let orderCount = this.randomBetween(5, 10);
        let offerList: Offer[] = [];
        let offerCount = this.randomBetween(1, 10);

        for (let o = 1; o <= orderCount; o++) {
            orders.push(
                {
                    id: `Order_${o}`,
                    date: this.dateService.toDate(`2018-01-${this.randomBetween(10, 28)}T13.59.59.997`),
                    customer: {id: `id_${o}`, email: `email_${o}`, phone: `phone_${o}`} as Customer,
                    note: `note_${o}`,
                    offerList: [] as Offer[]
                } as Order
            )
        }

        orders.forEach((order, index) => {
            for (let f = 1; f <= offerCount; f++) {
                order.offerList.push(
                    {
                        product: {
                            id: `product_${f}`,
                            url: `product_${f}`,
                            urlParent: `category_${f}`,
                            sku: f
                        } as Product,
                        count: this.randomBetween(1, 10),
                        price: this.randomBetween(1000, 5000),
                        height: this.randomBetween(150, 200),
                        size: this.randomBetween(1, 10)
                    } as Offer
                );
            }
        });

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
