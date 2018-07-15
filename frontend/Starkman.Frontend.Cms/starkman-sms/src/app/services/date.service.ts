import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';


@Injectable()
export class DateService {

  public inputDateFormat = 'YYYY-MM-DDTHH.mm.ss.SSS';
  public outputShortDateFormat = 'YYYY-MM-DD';
  public outputShortTimeFormat = 'HH:mm';

  constructor() { }

  // Преобразует строку в дату, в случае ошибки валидации возвращает null
  toDate(dateString: string): Date {

    // debugger;
    // извлекаем введённое значение:
    const inputDate = moment(dateString, this.inputDateFormat, true);

    // проверка, что значение может быть интерпретировано, как дата:
    const isValid = inputDate.isValid();

    // проверка, что введённое значение находится в допустимом интервале:
    const isInRange = inputDate.isBetween('1901-01-01', '2050-31-12', 'day', '[]');

    if (isValid && isInRange ) {
      return inputDate.local(true).toDate();
    } else {
      return null;
    }
  }

  // Преобразует дату в строку, в случае некорректной даты возвращает null
  toString(dateOject: Date, withoutTime: boolean = false): string {

    // debugger;
    const inputDate = moment(dateOject);

    // проверка, что значение может быть интерпретировано, как дата:
    const isValid = inputDate.isValid();

    // проверка, что введённое значение находится в допустимом интервале:
    const isInRange = inputDate.isBetween('1901-01-01', '2050-31-12', 'day', '[]');

      if (isValid && isInRange ) {
          if (withoutTime)
              return inputDate.local().format(this.outputShortDateFormat);
          else
            return inputDate.local().toISOString(true);
      } else {
          return null;
      }
  }

    // Преобразует дату в строку со временем, в случае некорректной даты возвращает null
    toTimeString(dateOject: Date): string {

        // debugger;
        const inputDate = moment(dateOject);

        // проверка, что значение может быть интерпретировано, как дата:
        const isValid = inputDate.isValid();

        // проверка, что введённое значение находится в допустимом интервале:
        const isInRange = inputDate.isBetween('1901-01-01', '2050-31-12', 'day', '[]');

        if (isValid && isInRange ) {
            return inputDate.local().format(this.outputShortTimeFormat);
        } else {
            return null;
        }
    }

}
