import { PipeTransform, Pipe } from "@angular/core";
import { Observable, of } from 'rxjs';

@Pipe({name: 'enum'})
export class EnumPipe implements PipeTransform {
    transform(value: object): Observable<string[]> {

        let result: string[] = [];

        if (value == null) return of(result);

        for( var property in value)
        {
            if (isNaN(Number(property))) {
                result.push(property);
            }
        }
        return of(result);
    }
}
