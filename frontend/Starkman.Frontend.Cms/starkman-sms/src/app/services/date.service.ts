import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';


@Injectable()
export class DateService {

  public inputDateFormat = 'YYYY-MM-DDTHH.mm.ss.SSS';

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
      return inputDate.toDate();
    } else {
      return null;
    }
  }

  // Преобразует дату в строку, в случае некорректной даты возвращает null
  toString(dateOject: Date): string {

    // debugger;
    const inputDate = moment(dateOject, this.inputDateFormat, true);

    // проверка, что значение может быть интерпретировано, как дата:
    const isValid = inputDate.isValid();

    // проверка, что введённое значение находится в допустимом интервале:
    const isInRange = inputDate.isBetween('1901-01-01', '2050-31-12', 'day', '[]');

      if (isValid && isInRange ) {
          return inputDate.toISOString(true);
      } else {
          return null;
      }
  }

}
