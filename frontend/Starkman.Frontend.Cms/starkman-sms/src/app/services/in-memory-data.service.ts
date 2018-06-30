import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';
import { DateService } from './date.service';
import { Category } from '../models/page/category';
import { Product } from '../models/page/product';

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
        let categories: Category[] =
            [
                {
                    url: 'bryuki_casual',
                    title: 'Брюки кажуал',
                    sortOrder: 1,
                    isVisible: true
                },
                {
                    url: 'bryuki_klassika',
                    title: 'Брюки классика',
                    sortOrder: 2,
                    isVisible: true
                },
                {
                    url: 'bryuki_zauzhennye',
                    title: 'Брюки зауженные',
                    sortOrder: 3,
                    isVisible: true
                },
                {
                    url: 'bryuki_detskie',
                    title: 'Брюки детские',
                    sortOrder: 4,
                    isVisible: true
                },
                {
                    url: 'kostyumy_pritalennye',
                    title: 'Костюмы приталенные',
                    sortOrder: 5,
                    isVisible: true
                },
                {
                    url: 'kostyumy_detskie',
                    title: 'Костюмы для мальчиков',
                    sortOrder: 6,
                    isVisible: true
                },
                {
                    url: 'pidzhaki_klassika',
                    title: 'Пиджаки классика',
                    sortOrder: 7,
                    isVisible: true
                },
                {
                    url: 'pidzhaki_pritalennye',
                    title: 'Пиджаки приталенные',
                    sortOrder: 8,
                    isVisible: true
                }
            ] as Category[];

        categories.forEach((category, index) =>
        {
            category.id = category.url

            let productList = [];

            let productCount = this.randomBetween(0, 5);

            for (let i = 1; i <= productCount; i++)
            {
                productList.push(
                    {
                        url: `${category.url}_product_${i}`,
                        urlParent: category.url,
                        title: `Product ${i} (${category.title})`,
                        description: `Description ${i} (${category.title})`,
                        metaKeywords: `MetaKeywords ${i} (${category.title})`,
                        metaDescription: `MetaDescription ${i} (${category.title})`,
                        sortOrder: i,
                        isVisible: true,
                        sku: i*(productCount/10)*10 + index,
                        photoList: []
                    } as Product
                );

                category.productList = productList;
            }
        });
        //debugger;
        return {categories};
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
