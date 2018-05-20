import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

export abstract class BaseService {

  protected apiRoutePrefix: string;

  constructor(
    protected apiDomain: string = 'http://localhost:8080', /* 'http://138.68.185.190:3000' */
    protected requestOptions = new RequestOptions(),
    private headers =
      new Headers(
        {
          'Content-Type': 'application/json; charset=utf-8',
          'X-Requested-With': 'XMLHttpRequest',
          'X-XSRF-TOKEN': '83ce7cb9-a84d-4560-946b-13602bf13ec1'
        })
  ) {
    this.requestOptions.headers = this.headers;
  }
}
