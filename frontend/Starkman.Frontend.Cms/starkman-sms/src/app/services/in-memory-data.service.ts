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
        let offers: Offer[] = [];

        let categories: Category[] =
            [
                {url: 'bryuki_casual', title: 'Брюки кажуал'},
                {url: 'bryuki_klassika', title: 'Брюки классика'},
                {url: 'bryuki_zauzhennye', title: 'Брюки зауженные'},
                {url: 'bryuki_detskie', title: 'Брюки детские'},
                {url: 'kostyumy_pritalennye', title: 'Костюмы приталенные'},
                {url: 'kostyumy_detskie', title: 'Костюмы для мальчиков'},
                {url: 'pidzhaki_klassika', title: 'Пиджаки классика'},
                {url: 'pidzhaki_pritalennye', title: 'Пиджаки приталенные'}
            ] as Category[];

        categories.forEach((category, index) => {
            category.id = category.url;
            category.sortOrder = index + 1;
            category.isVisible = true;
            category.description = `Description (${category.title})`;
            category.metaKeywords = `MetaKeywords (${category.title})`;
            category.metaDescription = `MetaDescription (${category.title})`;
            category.isVisible = true;
            category.photoList = [{
                id: `${category.url}_1`,
                url: `${category.url}_1`,
                title: `1`,
                type: 'type',
                size: 1,
                binaryString: '',
                base64String: this.getImage(),
                sortOrder: 1,
                isVisible: true,
            }] as Photo[];

            let productList = [];
            let productCount = this.randomBetween(1, 5);

            for (let p = 1; p <= productCount; p++) {
                let photoList = [];
                let offerList = [];
                let filterList = [];

                let photoCount = this.randomBetween(1, 5);
                let offerCount = this.randomBetween(1, 5);
                let filterCount = this.randomBetween(1, 5);

                for (let ph = 1; ph <= photoCount; ph++) {
                    photoList.push(
                        {
                            id: `${category.url}_product_${p}_${ph}`,
                            url: `${category.url}_product_${p}_${ph}`,
                            title: `${ph}`,
                            type: `type`,
                            size: 0,
                            binaryString: "",
                            base64String: this.getImage(),
                            sortOrder: ph,
                            isVisible: true,
                        } as Photo
                    );
                }

                for (let o = 1; o <= offerCount; o++) {
                    let offer =
                        {
                            id: `offer_${category.id}_${p}_${o}`,
                            count: this.randomBetween(1, 10),
                            price: this.randomBetween(1000, 5000),
                            size: this.randomBetween(1, 10),
                            height: this.randomBetween(150, 200)
                        } as Offer;

                    offerList.push(offer);
                    offers.push(offer);
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
                        sku: (index * 10 + p).toString(),
                        id: `${category.url}_product_${p}`,
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

            let orderOfferList = [];
            let orderOfferCount = this.randomBetween(1, 10);

            for (let p = 1; p <= orderOfferCount; p++) {
                let offer = Object.assign({}, offers[this.randomBetween(0, offers.length - 1)]);
                offer.product = Object.assign({}, products[this.randomBetween(0, products.length - 1)]);
                orderOfferList.push(offer);
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
                    customer: {
                        id: `customer_${o}`,
                        email: `email_${o}`,
                        phoneCountryCode: `+7`,
                        phone: `${phone}`,
                        name: `name_${o}`
                    } as Customer,
                    comment: `note_${o}`,
                    status: this.randomBetween(0, 1), //OrderStatus.New,
                    offerList: orderOfferList as Offer[],

                    filterOrderDate: this.dateService.toString(date, true),
                    filterCustomerPhone: phone.toString()
                } as Order
            );
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

    getImage(): string {
        return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAMAAABrrFhUAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMAUExURQAAAAEBAQICAgMDAwQEBAUFBQYGBgcHBwgICAkJCQoKCgsLCwwMDA0NDQ4ODg8PDxAQEBERERISEhMTExQUFBUVFRYWFhcXFxgYGBkZGRoaGhsbGxwcHB0dHR4eHh8fHyAgICEhISIiIiMjIyQkJCUlJSYmJicnJygoKCkpKSoqKisrKywsLC0tLS4uLi8vLzAwMDExMTIyMjMzMzQ0NDU1NTY2Njc3Nzg4ODk5OTo6Ojs7Ozw8PD09PT4+Pj8/P0BAQEFBQUJCQkNDQ0REREVFRUZGRkdHR0hISElJSUpKSktLS0xMTE1NTU5OTk9PT1BQUFFRUVJSUlNTU1RUVFVVVVZWVldXV1hYWFlZWVpaWltbW1xcXF1dXV5eXl9fX2BgYGFhYWJiYmNjY2RkZGVlZWZmZmdnZ2hoaGlpaWpqamtra2xsbG1tbW5ubm9vb3BwcHFxcXJycnNzc3R0dHV1dXZ2dnd3d3h4eHl5eXp6ent7e3x8fH19fX5+fn9/f4CAgIGBgYKCgoODg4SEhIWFhYaGhoeHh4iIiImJiYqKiouLi4yMjI2NjY6Ojo+Pj5CQkJGRkZKSkpOTk5SUlJWVlZaWlpeXl5iYmJmZmZqampubm5ycnJ2dnZ6enp+fn6CgoKGhoaKioqOjo6SkpKWlpaampqenp6ioqKmpqaqqqqurq6ysrK2tra6urq+vr7CwsLGxsbKysrOzs7S0tAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADzbe4UAAAEAdFJOU////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wBT9wclAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAQnRFWHRDb21tZW50AENSRUFUT1I6IGdkLWpwZWcgdjEuMCAodXNpbmcgSUpHIEpQRUcgdjYyKSwgcXVhbGl0eSA9IDEwMAq7fHejAAAAGXRFWHRTb2Z0d2FyZQBwYWludC5uZXQgNC4wLjIx8SBplQAAGdhJREFUGBnlwYmbFOX5NeBznuet7tmZYQABEWQRBMEdxV3c0BhMVFSiYgy4fNFgNBolbjGokARjTBS3KBqTiLuY+P+d31A93V3dXQv0VDlzXd99Q/+fgyq3513NyLavVCGoat9PPqQZWXSFKgRV7eqB8zUT39ZqH6s6UNXmRROaiRfpV6s6UMXuMqv9RzNwI6ym6kAVmzSExzUDp5F2rSoDVWvnAAOv1gwMOKKxo6oKVKlv50dOrlD/Dpgz4CpVBarULcHcfOQj9e3mADev/VMVgSo1FoWIZo+pb+vMjKzdqIpAVdoRGBncrlSKL4778ouGL7/44ovP1evYPJgFs/n/VjWgCn06YSBALlSvz5eNj88bHhpuGBkdHb1cvX7vIKbY9aoGVJlPb1mEafW31OviYI4mAtEb6nUjHVPI2tonVQWoIk+fOxghoIG71OuTee5osoCzlGK+RTgugtv4Te+pdFAlfrGiFrm5kYhdoBTX1ogmw9iflILuhikkveajl/9ZJYPK9/ZVEyA6LFaKD+c7pnEobFaKAwCNAAhwCsKaPSoVVLZHltWIbn5EKW6qYRqj2mGluAldaBy+7C8qD1SqY/cuCU4QnRieUIqPxzDNok1KsxYtxHE089rQxpdVFqhE+y8ZqBMeuaHbZUpzGTFt6HWl+N8QWoiYhzDgtEU7vlYpoNI8tNCMIC0YujAsU5q3JuAwEH6O0hw0ohMBwxTWwoVvqQRQ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';
    }
}
