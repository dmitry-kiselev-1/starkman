import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';
import { DateService } from './date.service';
import { Category } from '../models/page/category';
import { Product } from '../models/page/product';

/*
  GET api/categories          // all categories
  GET api/categories/42       // the category with id=42
  GET api/categories??propertyName=^j  // 'j' is a regexPattern; returns heroes whose name starting with 'j' or 'J'
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
                    id: 1,
                    url: 'bryuki_casual',
                    Title: 'Брюки кажуал',
                    SortOrder: 1,
                    IsVisible: true
                },
                {
                    url: 'bryuki_klassika',
                    Title: 'Брюки классика',
                    SortOrder: 2,
                    IsVisible: true
                },
                {
                    url: 'bryuki_zauzhennye',
                    Title: 'Брюки зауженные',
                    SortOrder: 3,
                    IsVisible: true
                },
                {
                    url: 'bryuki_detskie',
                    Title: 'Брюки детские',
                    SortOrder: 4,
                    IsVisible: true
                },
                {
                    url: 'kostyumy_pritalennye',
                    Title: 'Костюмы приталенные',
                    SortOrder: 5,
                    IsVisible: true
                },
                {
                    url: 'kostyumy_detskie',
                    Title: 'Костюмы для мальчиков',
                    SortOrder: 6,
                    IsVisible: true
                },
                {
                    url: 'pidzhaki_klassika',
                    Title: 'Пиджаки классика',
                    SortOrder: 7,
                    IsVisible: true
                },
                {
                    url: 'pidzhaki_pritalennye',
                    Title: 'Пиджаки приталенные',
                    SortOrder: 8,
                    IsVisible: true
                }
            ] as Category[];

        categories.forEach((category, index) =>
        {
            let productList = [];

            let productCount = this.randomBetween(0, 5);

            for (let i = 1; i <= productCount; i++)
            {
                productList.push(
                    {
                        url: `${category.url}_product_${i}`,
                        UrlParent: category.url,
                        Title: `Product ${i} (${category.Title})`,
                        Description: `Description ${i} (${category.Title})`,
                        MetaKeywords: `MetaKeywords ${i} (${category.Title})`,
                        MetaDescription: `MetaDescription ${i} (${category.Title})`,
                        SortOrder: i,
                        IsVisible: true,
                        Sku: i*(productCount/10)*10 + index,
                        PhotoList: []
                    } as Product
                );

                category.ProductList = productList;
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
