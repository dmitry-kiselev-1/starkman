import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

export abstract class BaseService {

  protected apiRoutePrefix: string;

  constructor(
    protected apiDomain: string = 'http://localhost:8082', /* 'http://138.68.185.190:3000', */
    /* protected uiDomain: string = 'http://localhost:4200', */ /* 'http://138.68.185.190:4200', */
    protected requestOptions = new RequestOptions(),
    private headers =
      new Headers(
        {
          'Content-Type': 'application/json; charset=utf-8',
          'X-Requested-With': 'XMLHttpRequest',
          'X-XSRF-TOKEN': '83ce7cb9-a84d-4560-946b-13602bf13ec1'
          /*'Access-Control-Allow-Origin': uiDomain,
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
          'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
          'Access-Control-Allow-Credentials': true,*/
          /*'Origin': uiDomain*/
          /*Access-Control-Request-Method: POST*/
          /*Access-Control-Request-Headers: X-Custom-Header*/
        })
  ) {
    this.requestOptions.headers = this.headers;
  }

  protected handleError(error: any): Promise<any> {
    console.log(error);
    return Promise.reject(error);
  }
}
